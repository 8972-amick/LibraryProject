import express from "express";
import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} from "../controllers/bookControllers.js";

import verifyToken from "../Middleware/authMiddleware.js";
import allowRoles from "../Middleware/roleMiddleware.js";
import upload from "../Middleware/uploadMiddleware.js";

const router = express.Router();

// Create a new book (with image)
router.post(
  "/",
  verifyToken,
  allowRoles("librarian"),
  upload.single("photo"),
  createBook
);

// Get all books
router.get("/", getAllBooks);

// Update book (with optional new image)
router.put(
  "/:id",
  verifyToken,
  allowRoles("librarian"),
  upload.single("photo"),
  updateBook
);

// Delete book
router.delete("/:id", verifyToken, allowRoles("librarian"), deleteBook);

export default router;

