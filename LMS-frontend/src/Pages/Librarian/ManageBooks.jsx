import React, { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function ManageBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await API.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (book) => {
    setEditingBookId(book._id);
    setEditData({ ...book });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "available" ? Number(value) : value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await API.put(`/books/${id}`, editData);
      setEditingBookId(null);
      fetchBooks();
      alert("Book updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating book!");
    }
  };

  const handleCancel = () => {
    setEditingBookId(null);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex items-center justify-between mb-4">
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-1 pl-150">Manage Books</h1>
    <p className=" pl-150 italic">Every Book in Its Place.</p>
  </div>

  <button
    onClick={() => navigate("/librarian/addbooks")}
    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
  >
    Add New Book
  </button>
</div>


      <table className="w-full table-auto border-collapse bg-white shadow rounded">
        <thead className="bg-blue-200">
          <tr>
            <th className="p-2 border text-blue-500">Title</th>
            <th className="p-2 border text-blue-500">Author</th>
            <th className="p-2 border text-blue-500">ISBN</th>
            <th className="p-2 border text-blue-500">Quantity</th>
            <th className="p-2 border text-blue-500">Available</th>
            <th className="p-2 border text-blue-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className={index % 2 === 0 ? "bg-white" : "bg-blue-100"}
            >
              {editingBookId === book._id ? (
                <>
                  <td className="p-2 border border-blue-400 text-center">
                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border border-blue-400 text-center">
                    <input
                      type="text"
                      name="author"
                      value={editData.author}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border border-blue-400 text-center">
                    <input
                      type="text"
                      name="isbn"
                      value={editData.isbn}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border border-blue-400 text-center">
                    <input
                      type="number"
                      name="quantity"
                      value={editData.quantity}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border border-blue-400 text-center">
                    <input
                      type="number"
                      name="available"
                      value={editData.available}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="p-2 border border-blue-400 flex justify-center gap-2">
                    <button
                      onClick={() => handleUpdate(book._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 transition text-sm"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">{book.title}</td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">{book.author}</td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">{book.isbn}</td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">{book.quantity}</td>
                  <td className="p-2 border border-blue-300 text-blue-600 text-center">{book.available}</td>
                  <td className="p-2 border border-blue-300 text-blue-600 flex justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(book)}
                      className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-blue-700 text-white px-2 py-1 rounded hover:bg-blue-800 transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
