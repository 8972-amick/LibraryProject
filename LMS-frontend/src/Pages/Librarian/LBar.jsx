import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import avatarImg from "../../assets/undraw_female-avatar_7t6k.svg";

const LBar = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [name, setName] = useState(storedUser.name || "Admin User");
  const [email, setEmail] = useState(storedUser.email || "admin@example.com");
  const [password, setPassword] = useState(storedUser.password || "");
  const profileImage = avatarImg; // use imported image

  useEffect(() => {
    const updatedUser = JSON.parse(localStorage.getItem("user"));
    if (updatedUser) {
      setName(updatedUser.name);
      setEmail(updatedUser.email);
    }
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...storedUser, name, email, password };
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
      <div className="w-full flex flex-row items-center justify-between px-6 py-3 border-b border-gray-300 bg-white shadow-sm">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-2xl text-black">Tales & Tea</h1>
        </div>

        {/* Middle: Links */}
        <div className="flex items-center gap-6 pl-5 ml-80">
          <NavLink
            to="/librarian/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-bold text-blue-400"
                : "text-lg text-black font-semibold hover:text-blue-500 transition"
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/librarian/managebooks"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-bold text-blue-400"
                : "text-lg text-black font-semibold hover:text-blue-500 transition"
            }
          >
            📘 Manage Books
          </NavLink>
          <NavLink
            to="/librarian/addbooks"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-bold text-blue-400"
                : "text-lg text-black font-semibold hover:text-blue-500 transition"
            }
          >
            ➕ Add Book
          </NavLink>
          <NavLink
            to="/librarian/borrowrecord"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-bold text-blue-400"
                : "text-lg text-black font-semibold hover:text-blue-500 transition"
            }
          >
            📄 Borrow Record
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-lg text-black font-semibold hover:text-blue-500 transition"
          >
            🔓 Logout
          </button>
        </div>

        {/* Right: User Info */}
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

          {/* Profile Dropdown */}
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
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="text-gray-300">
        <div className="max-w-xl mx-auto px-2">
          <div className="text-center text-sm text-black pt-2">
            <p>© 2025 BookVault. All rights reserved.</p>
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

export default LBar;
