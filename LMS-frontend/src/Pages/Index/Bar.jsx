import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import API from "../../api";

const Bar = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  // User info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage] = useState("./src/assets/undraw_female-avatar_7t6k.svg");

  // state for books and searching for books
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // fetching books from backend
  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books when search term or books change
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  // Load user info
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setName(storedUser.name || "");
      setEmail(storedUser.email || "");
      setPassword(storedUser.password || "");
    }
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { name, email, password, profileImage };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setProfileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <div className="w-full flex flex-row items-center justify-between px-6 py-3 border-b border-blue-300 bg-white shadow-sm">
        <h1 className="font-bold text-2xl text-black">Tales & Tea</h1>

        <div className="flex items-center gap-6 pl-46">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-lg font-bold text-blue-400"
                : "text-lg text-black font-semibold hover:text-blue-500 transition"
            }
          >
            🏚 Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-bold text-blue-400"
                : "text-lg text-black font-semibold hover:text-blue-500 transition"
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/book"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-bold text-blue-400"
                : "text-lg text-black  font-semibold hover:text-blue-500 transition"
            }
          >
            📘 Book
          </NavLink>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-bold text-blue-400"
                : "text-lg text-black font-semibold hover:text-blue-500 transition"
            }
          >
            ℹ About Us
          </NavLink>
          <NavLink
            to="/contactus"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-bold text-blue-400"
                : "text-lg text-black font-semibold hover:text-blue-500 transition"
            }
          >
            📞 Contact Us
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-lg text-black font-semibold hover:text-blue-500 transition"
          >
            🔓 Logout
          </button>
        </div>

        {/* Search Box */}
        <div className="flex justify-center ml-6">
          <input
            type="text"
            placeholder="🔍 Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        
        <div className="flex items-center gap-6 relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="flex flex-col text-sm text-right">
              <span className="font-semibold text-gray-800">{name}</span>
              <span className="text-gray-500">{email}</span>
            </div>
            <img
              src={profileImage}
              alt="User Avatar"
              className="h-10 w-10 rounded-full bg-white border border-gray-200"
            />
          </div>

          {profileOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white border border-gray-300 rounded shadow-lg p-4 z-50">
              <form
                onSubmit={handleSaveProfile}
                className="flex flex-col gap-3"
              >
                <label className="text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <label className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
                >
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Routed page content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet context={{ filteredBooks, searchTerm }} />
      </div>

       {/* Footer */}
      <footer className="text-gray-300">
        <div className="max-w-xl mx-auto px-2">
          <div className="text-center text-sm text-black pt-2">
            <p>© 2025 Tales & Tea. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-1">
              <a
                href="#"
                className="text-black hover:font-bold hover:text-md cursor-pointer"
              >
                Whatsapp
              </a>
              <a
                href="#"
                className="text-black hover:font-bold hover:text-md cursor-pointer"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-black hover:font-bold hover:text-md cursor-pointer"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Bar;
