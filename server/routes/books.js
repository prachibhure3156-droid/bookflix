import { Router } from "express";
import db from "../database/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.get("/library", requireAuth, (req, res) => {
  res.json(db.prepare("SELECT * FROM library WHERE user_id=? ORDER BY updated_at DESC").all(req.user.id));
});
router.post("/library", requireAuth, (req, res) => {
  const { bookId, title, author = "Unknown author", cover = "", status = "Want to Read" } = req.body || {};
  if (!bookId || !title) return res.status(400).json({ message: "Book ID and title are required." });
  db.prepare(`INSERT INTO library(user_id,book_id,title,author,cover,status)
    VALUES(?,?,?,?,?,?) ON CONFLICT(user_id,book_id) DO UPDATE SET
    title=excluded.title, author=excluded.author, cover=excluded.cover, status=excluded.status,
    updated_at=CURRENT_TIMESTAMP`).run(req.user.id, String(bookId), title, author, cover, status);
  res.json({ message: "Book saved to your library." });
});
router.patch("/library/:bookId", requireAuth, (req, res) => {
  const { progress, status } = req.body || {};
  const row = db.prepare("SELECT * FROM library WHERE user_id=? AND book_id=?").get(req.user.id, req.params.bookId);
  if (!row) return res.status(404).json({ message: "Book not found in your library." });
  db.prepare(`UPDATE library SET progress=?, status=?, updated_at=CURRENT_TIMESTAMP WHERE user_id=? AND book_id=?`)
    .run(Math.max(0, Math.min(100, Number(progress ?? row.progress))), status || row.status, req.user.id, req.params.bookId);
  if (Number(progress) > 0) db.prepare("INSERT INTO reading_sessions(user_id,book_id,title,pages) VALUES(?,?,?,?)")
    .run(req.user.id, req.params.bookId, row.title, Math.max(1, Number(req.body.pages || 1)));
  res.json({ message: "Reading progress updated." });
});
router.delete("/library/:bookId", requireAuth, (req, res) => {
  db.prepare("DELETE FROM library WHERE user_id=? AND book_id=?").run(req.user.id, req.params.bookId);
  res.json({ message: "Book removed." });
});
router.get("/history", requireAuth, (req, res) => {
  res.json(db.prepare("SELECT * FROM reading_sessions WHERE user_id=? ORDER BY created_at DESC LIMIT 30").all(req.user.id));
});
export default router;
