import express from "express";
import {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  deleteBorrowRecord,
} from "../controllers/borrowControllers.js";

import verifyToken from "../Middleware/authMiddleware.js";
import allowRoles from "../Middleware/roleMiddleware.js";

const router = express.Router();

// Borrow a book
router.post("/", verifyToken, allowRoles("borrower"), borrowBook);

// Return a book
router.post("/return", verifyToken, allowRoles("borrower"), returnBook);

// Get all borrow records
router.get("/records", verifyToken, allowRoles("librarian"), getBorrowedBooks);

// Delete a borrow record
router.delete("/:id", verifyToken, allowRoles("librarian"), deleteBorrowRecord);

export default router;
