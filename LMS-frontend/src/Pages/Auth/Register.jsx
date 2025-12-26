import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faEnvelope,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "borrower",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name : ", name);
    console.log("value ", value);
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  console.log(userData);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://libraryproject-bm4n.onrender.com/api/auth/register",
        userData
      );

      // If backend returned token and user, store them
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // Navigate based on role if available
      const role = response.data?.user?.role || userData.role;
      if (role === "librarian") {
        navigate("/librarian/dashboard");
      } else {
        navigate("/");
      }

      alert(response.data.message || "Register Successful");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || "Registration failed");
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg h-160">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-center">SIGN UP</h1>
            <p className="text-center mb-8 text-sm">
              Sign Up. Step In. Stand Out
            </p>
          </div>

          {/* fullname */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center border border-gray-200 rounded-xl h-18 mb-5 bg-white shadow-sm px-3">
              <FontAwesomeIcon
                icon={faUser}
                size="2xl"
                className="text-black mr-3"
              />
              <input
                type="text"
                placeholder="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="bg-white w-full focus:outline-none"
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center border border-gray-200 rounded-xl h-18 mb-5 bg-white shadow-sm px-3">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="2xl"
                className="text-black mr-3"
              />
              <input
                type="text"
                placeholder="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="bg-white w-full focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border border-gray-200 rounded-xl h-18  mb-5 bg-white shadow-sm px-3">
              <FontAwesomeIcon
                icon={faLock}
                size="2xl"
                className="text-black mr-3"
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="bg-white w-full focus:outline-none"
              />
            </div>

            {/* role input  */}
            <div className="flex items-center border border-gray-200 rounded-xl h-18 mb-5 bg-white shadow-sm px-3">
              <FontAwesomeIcon
                icon={faBookOpen}
                size="2xl"
                className="text-black mr-3"
              />
              <select
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="bg-white w-full focus:outline-none"
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="librarian">Librarian</option>
                <option value="borrower">Borrower</option>
              </select>
            </div>

            {/* Login Button */}
            <input
              type="submit"
              placeholder="login"
              className="w-full bg-orange-400 text-white py-3 rounded-xl h-16 font-semibold hover:bg-orange-500 transition"
            />
          </form>

          <div className="mt-4 text-center">
            <p>
              Do you have an account?{" "}
              <Link
                to="/login"
                className="text-orange-400 font-semibold cursor-pointer hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
