import prisma from "../prismaClient.js";
export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = Number(req.user.id);

    // Check if book exists
    const book = await prisma.book.findUnique({ where: { id: Number(bookId) } });
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.available < 1)
      return res.status(400).json({ message: "Book not available" });

    // Create borrow record
    const borrowRecord = await prisma.borrow.create({ data: { userId, bookId: Number(bookId) } });

    await prisma.book.update({ where: { id: Number(bookId) }, data: { available: { decrement: 1 } } });

    const populatedRecord = await prisma.borrow.findUnique({
      where: { id: borrowRecord.id },
      include: { user: { select: { name: true, email: true } }, book: { select: { title: true, author: true } } },
    });

    res.status(201).json({
      message: "Book borrowed successfully",
      record: populatedRecord,
    });
  } catch (err) {
    console.error("Error borrowing book:", err);
    res
      .status(500)
      .json({ message: "Failed to borrow book", error: err.message });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;
    const userId = Number(req.user.id);

    const borrowRecord = await prisma.borrow.findFirst({ where: { id: Number(borrowId), userId } });
    if (!borrowRecord)
      return res.status(404).json({ message: "Borrow record not found" });
    if (borrowRecord.returnDate)
      return res.status(400).json({ message: "Book already returned" });

    // Mark as returned
    const updatedBorrow = await prisma.borrow.update({ where: { id: borrowRecord.id }, data: { returnDate: new Date() } });

    // Increase available count if book exists
    await prisma.book.update({ where: { id: borrowRecord.bookId }, data: { available: { increment: 1 } } });

    const populatedRecord = await prisma.borrow.findUnique({
      where: { id: updatedBorrow.id },
      include: { user: { select: { name: true, email: true } }, book: { select: { title: true, author: true } } },
    });

    res.json({
      message: "Book returned successfully",
      record: populatedRecord,
    });
  } catch (err) {
    console.error("Error returning book:", err);
    res
      .status(500)
      .json({ message: "Failed to return book", error: err.message });
  }
};

// Get all borrow records (for librarian)
export const getBorrowedBooks = async (req, res) => {
  try {
    const records = await prisma.borrow.findMany({
      include: { user: { select: { name: true, email: true } }, book: { select: { title: true, author: true } } },
      orderBy: { borrowDate: "desc" },
    });

    const formatted = records.map((r) => ({
      id: r.id,
      user: r.user ? r.user.name : "Unknown User",
      email: r.user ? r.user.email : "N/A",
      book: r.book ? r.book.title : "Deleted Book",
      author: r.book ? r.book.author : "-",
      borrowDate: r.borrowDate,
      returnDate: r.returnDate,
      status: r.returnDate ? "Returned" : "Borrowed",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching borrow records:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch borrow records", error: err.message });
  }
};

export const deleteBorrowRecord = async (req, res) => {
  try {
    const borrowId = Number(req.params.id);
    const borrow = await prisma.borrow.findUnique({ where: { id: borrowId } });
    if (!borrow) return res.status(404).json({ message: "Borrow record not found" });

    if (!borrow.returnDate) {
      await prisma.book.update({ where: { id: borrow.bookId }, data: { available: { increment: 1 } } });
    }

    await prisma.borrow.delete({ where: { id: borrowId } });

    res.json({ message: "Borrow record deleted successfully" });
  } catch (err) {
    console.error("Error deleting borrow record:", err);
    res.status(500).json({ message: "Failed to delete borrow record", error: err.message });
  }
};
