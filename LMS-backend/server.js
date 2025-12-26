import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:8081","*","https://your-frontend.onrender.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow mobile/native apps (no origin)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

import prisma from "./prismaClient.js";

const start = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Prisma connection failed:");
    console.error(err.message || err);
  }
};

start();

export default app;