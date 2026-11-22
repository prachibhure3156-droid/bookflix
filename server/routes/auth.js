import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database/db.js";

const router = Router();
const secret = () => process.env.JWT_SECRET || "dev-only-change-this-secret";

router.post("/register", (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name?.trim() || !email?.trim() || !password || password.length < 6)
    return res.status(400).json({ message: "Enter your name, a valid email and a password of at least 6 characters." });
  try {
    const hash = bcrypt.hashSync(password, 10);
    const result = db.prepare("INSERT INTO users(name,email,password_hash) VALUES(?,?,?)")
      .run(name.trim(), email.trim().toLowerCase(), hash);
    const user = { id: result.lastInsertRowid, name: name.trim(), email: email.trim().toLowerCase() };
    const token = jwt.sign(user, secret(), { expiresIn: "7d" });
    res.status(201).json({ token, user });
  } catch (e) {
    res.status(409).json({ message: e.code === "SQLITE_CONSTRAINT_UNIQUE" ? "An account with this email already exists." : "Could not create account." });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const userRow = db.prepare("SELECT * FROM users WHERE email = ?").get((email || "").toLowerCase().trim());
  if (!userRow || !bcrypt.compareSync(password || "", userRow.password_hash))
    return res.status(401).json({ message: "Incorrect email or password." });
  const user = { id: userRow.id, name: userRow.name, email: userRow.email };
  const token = jwt.sign(user, secret(), { expiresIn: "7d" });
  res.json({ token, user });
});
export default router;
