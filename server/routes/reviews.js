import { Router } from "express";
import db from "../database/db.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();
router.get("/:bookId", (req, res) => {
  res.json(db.prepare("SELECT id,user_name,rating,comment,created_at FROM reviews WHERE book_id=? ORDER BY created_at DESC").all(req.params.bookId));
});
router.post("/", requireAuth, (req, res) => {
  const { bookId, rating, comment } = req.body || {};
  const value = Number(rating);
  if (!bookId || !comment?.trim() || value < 1 || value > 5) return res.status(400).json({ message: "Provide a book, a 1–5 rating and a comment." });
  db.prepare("INSERT INTO reviews(user_id,book_id,user_name,rating,comment) VALUES(?,?,?,?,?)")
    .run(req.user.id, String(bookId), req.user.name, value, comment.trim());
  res.status(201).json({ message: "Review posted." });
});
export default router;
