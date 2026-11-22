import { Router } from "express";
import db from "../database/db.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();
router.get("/hobbies", requireAuth, (req,res) => {
  res.json(db.prepare("SELECT day,hobby,note FROM hobby_days WHERE user_id=? ORDER BY day").all(req.user.id));
});
router.post("/hobbies", requireAuth, (req,res) => {
  const { day, hobby="Reading", note="" } = req.body || {};
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day || "")) return res.status(400).json({message:"Choose a valid calendar date."});
  db.prepare("INSERT INTO hobby_days(user_id,day,hobby,note) VALUES(?,?,?,?) ON CONFLICT(user_id,day) DO UPDATE SET hobby=excluded.hobby,note=excluded.note")
    .run(req.user.id,day,hobby,note);
  res.json({message:"Hobby activity saved."});
});
router.delete("/hobbies/:day", requireAuth, (req,res) => {
  db.prepare("DELETE FROM hobby_days WHERE user_id=? AND day=?").run(req.user.id,req.params.day);
  res.json({message:"Hobby activity removed."});
});
export default router;
