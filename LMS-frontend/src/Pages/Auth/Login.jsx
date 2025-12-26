import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faXTwitter,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );
    toast.success("Login successful!");
    console.log(res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Role-based navigation
    if (res.data.user?.role === "librarian") {
      navigate("/librarian/dashboard");   
    } else if (res.data.user?.role === "borrower") {
      navigate("/");  
    } else {
      navigate("/login"); 
    }

  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    alert(error.response?.data?.message || "Login failed. Invalid password or email.");
  }
}


  return (
  <div className="flex items-center justify-center min-h-screen bg-blue-50">
  <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg h-140">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-center">LOGIN</h1>
          <p className="text-center mb-8 text-sm">
            Welcome Back! Let’s Pick Up Where You Left Off.
          </p>
        </div>

        {/* Email Input */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border border-blue-200 rounded-xl h-18 mb-5 bg-white shadow-sm px-3">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="2xl"
              className="text-blue-700 mr-3"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-white w-full focus:outline-none text-blue-800"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-blue-200 rounded-xl h-18 mb-5 bg-white shadow-sm px-3">
            <FontAwesomeIcon
              icon={faLock}
              size="2xl"
              className="text-blue-700 mr-3"
            />
            <input
              type="password" 
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-white w-full focus:outline-none text-blue-800"
            />
          </div>

          {/* Login Button */}
          <input
            type="submit"
            value="Login"
            className="w-full bg-blue-600 text-white py-3 rounded-xl h-16 font-semibold hover:bg-blue-700 transition"
          />
        </form>

        <div className="mt-4 text-center">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/Register"
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Social Sign Up */}
        <div className="text-center mt-8 space-x-4">
          <p>Or signup with</p>
          <FontAwesomeIcon
            icon={faWhatsapp}
            size="2xl"
            className="text-blue-800 hover:text-blue-400 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faFacebook}
            size="2xl"
            className="text-black hover:text-orange-400 cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faXTwitter}
            size="2xl"
            className="text-black hover:text-orange-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;