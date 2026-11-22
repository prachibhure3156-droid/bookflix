import { Router } from "express";
import db from "../database/db.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();

router.get("/", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT * FROM words WHERE user_id=? ORDER BY created_at DESC").all(req.user.id);
  res.json(rows.map(r => ({ ...r, synonyms: JSON.parse(r.synonyms || "[]"), antonyms: JSON.parse(r.antonyms || "[]") })));
});
router.post("/", requireAuth, (req, res) => {
  const { word, definition = "", synonyms = [], antonyms = [], difficulty = "Medium", bookTitle = "" } = req.body || {};
  if (!word?.trim()) return res.status(400).json({ message: "A word is required." });
  db.prepare("INSERT INTO words(user_id,word,definition,synonyms,antonyms,difficulty,book_title) VALUES(?,?,?,?,?,?,?)")
    .run(req.user.id, word.trim(), definition, JSON.stringify(synonyms), JSON.stringify(antonyms), difficulty, bookTitle);
  res.status(201).json({ message: "Word saved to your vocabulary vault." });
});
router.delete("/:id", requireAuth, (req, res) => {
  db.prepare("DELETE FROM words WHERE id=? AND user_id=?").run(req.params.id, req.user.id);
  res.json({ message: "Word removed." });
});
export default router;
