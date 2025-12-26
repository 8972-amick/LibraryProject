import React, { useState } from "react";
import API from "../../api";

export default function AddBooks() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: 1,
  });
  const [photoFile, setPhotoFile] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photoFile) {
      alert("Please select a book cover image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("isbn", book.isbn);
      formData.append("quantity", book.quantity);
      formData.append("photo", photoFile);

      await API.post("/books", formData);

      alert("Book added successfully!");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add book");
    }
  };

  return (
  <div className="p-6 border border-2 border-blue-100 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
  className="bg-white shadow-2xl rounded p-6 w-full max-w-md"
      >
  <h1 className="text-2xl font-bold mb-1 text-center text-blue-600">
          Add New Book
        </h1>
        <p className="text-center mb-4 text-sm">
          Add Stories. Inspire Readers.
        </p>

        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">Author</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">ISBN</label>
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">Quantity</label>
        <input
          type="number"
          name="quantity"
          min={1}
          value={book.quantity}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 font-semibold">Book Cover</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-4"
        />

        {photoFile && (
          <div className="mb-4">
            <p className="text-sm mb-1">Preview:</p>
            <img
              src={URL.createObjectURL(photoFile)}
              alt="Preview"
              className="w-full h-48 object-cover rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
