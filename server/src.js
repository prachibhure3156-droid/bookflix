import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";
import wordRoutes from "./routes/words.js";
import reviewRoutes from "./routes/reviews.js";
import trackerRoutes from "./routes/tracker.js";

const app = express();
// Allow the configured frontend origin and Vite's localhost development ports.
// Vite may move from 5173 to 5174/5175 when the default port is already occupied.
const configuredOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "https://your-vercel-app-url.vercel.app"], 
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok", app: "BookFlix API" }));
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/words", wordRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/tracker", trackerRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error." });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`BookFlix API running at http://localhost:${port}`));
