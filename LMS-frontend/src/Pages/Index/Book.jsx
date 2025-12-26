import React from "react";
import { useOutletContext } from "react-router-dom";
import API from "../../api";

export default function Book() {
  const { filteredBooks } = useOutletContext();

  const handleBorrow = async (bookId) => {
    try {
      const res = await API.post("/borrow", { bookId });

      filteredBooks.forEach((book) => {
        if (book._id === bookId) {
          book.borrowedByMe = true;
          book.borrowId = res.data._id;
          book.available -= 1;
        }
      });

      alert("Book borrowed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to borrow book");
    }
  };
  const handleReturn = async (borrowId) => {
    try {
      await API.post("/borrow/return", { borrowId });
      filteredBooks.forEach((book) => {
        if (book.borrowId === borrowId) {
          book.borrowedByMe = false;
          book.borrowId = null;
          book.available += 1;
        }
      });
    } catch (err) {
      console.error(err);
      alert("Failed to return book");
    }
  };

  return (
    <div className=" min-h-screen">
      <div className="text-white h-30 pt-8 bg-gradient-to-r from-blue-300 to-blue-500">
        <h1 className="text-4xl font-bold mb-1 text-center">Borrow Books</h1>
        <p className="mb-6 text-center italic">Every Page a New Adventure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white h-70 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition flex border border-3 border-gray-100"
            >
              {/* Left: Book Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="mt-3">
                  <h2 className="text-2xl font-bold mb-2 ">{book.title}</h2>
                  <p className="text-gray-600 mb-1">by {book.author}</p>
                  <p className="text-gray-500 mb-2">ISBN: {book.isbn}</p>
                  <p className="text-sm mb-4">
                    {book.available > 0 ? (
                      <span className="text-green-600 font-semibold">
                        {book.available} available
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Not available
                      </span>
                    )}
                  </p>
                </div>

                {/* Borrow / Return Button */}
                {book.borrowedByMe ? (
                  <button
                    onClick={() => handleReturn(book.borrowId)}
                    className="w-full bg-green-500 text-white py-2 rounded-xl font-semibold hover:bg-green-600 transition"
                  >
                    Return
                  </button>
                ) : (
                  <button
                    onClick={() => handleBorrow(book._id)}
                    disabled={book.available === 0}
                    className={`w-40 py-2 rounded-lg font-semibold transition ${
                      book.available > 0
                        ? "bg-blue-400 text-white hover:bg-blue-500"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Borrow
                  </button>
                )}
              </div>

              {/* Right: Book Image */}
              <div className="w-48 flex items-center justify-center">
                {book.photo ? (
                  <img
                    src={`https://lms-backend-47wp.onrender.com${book.photo}`}
                    alt={book.title}
                    className="w-100 h-60 p-3 object-cover"
                  />
                ) : (
                  <div className="text-gray-500 text-center p-2">
                    No Cover Available
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No books found
          </p>
        )}
      </div>
    </div>
  );
}
