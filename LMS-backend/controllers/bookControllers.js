import prisma from "../prismaClient.js";


export const createBook = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { title, author, isbn, quantity } = req.body;

    if (!title || !author || !isbn || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid book data" });
    }

    const existingBook = await prisma.book.findUnique({ where: { isbn } });
    if (existingBook) {
      return res
        .status(400)
        .json({ message: "Book with this ISBN already exists" });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        quantity: Number(quantity),
        available: Number(quantity),
        photo: req.file ? `/uploads/books/${req.file.filename}` : null,
        visibleToBorrowers: true,
      },
    });

    res.status(201).json(book);
  } catch (err) {
    console.error("Error creating book:", err);
    res
      .status(500)
      .json({ message: "Failed to create book", error: err.message });
  }
};


export const getAllBooks = async (req, res) => {
  try {
    const userId = req.user ? Number(req.user.id) : null;
    const books = await prisma.book.findMany();

    const updatedBooks = await Promise.all(
      books.map(async (book) => {
        let borrowedByMe = false;
        let borrowId = null;

        if (userId) {
          const borrowRecord = await prisma.borrow.findFirst({
            where: {
              userId,
              bookId: book.id,
              returnDate: null,
            },
          });
          if (borrowRecord) {
            borrowedByMe = true;
            borrowId = borrowRecord.id;
          }
        }

        return {
          ...book,
          borrowedByMe,
          borrowId,
        };
      })
    );

    res.json(updatedBooks);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Failed to fetch books" });
  }
};


export const updateBook = async (req, res) => {
  try {
    const book = await prisma.book.findUnique({ where: { id: Number(req.params.id) } });
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { title, author, quantity } = req.body;
    const data = {};
    if (title) data.title = title;
    if (author) data.author = author;

    if (quantity !== undefined) {
      const change = Number(quantity) - book.quantity;
      data.quantity = Number(quantity);
      data.available = Math.max(0, book.available + change);
    }

    if (req.file) {
      data.photo = `/uploads/books/${req.file.filename}`;
    }

    const updated = await prisma.book.update({ where: { id: book.id }, data });
    res.json(updated);
  } catch (err) {
    console.error("Error updating book:", err);
    res
      .status(500)
      .json({ message: "Failed to update book", error: err.message });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const book = await prisma.book.delete({ where: { id: Number(req.params.id) } });
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res
      .status(500)
      .json({ message: "Failed to delete book", error: err.message });
  }
};
