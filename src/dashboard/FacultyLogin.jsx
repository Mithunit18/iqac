import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const FacultyLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialDepartment = queryParams.get("department") || ""; // Get department from URL

  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const FacultyDB = async () => {
    if (!initialDepartment) {
      setError("Department is required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5002/api/faculty/faculty-login", {
        departmentName: initialDepartment,
        name:name,
        emailId: email,
        password: password,
      });

      console.log(name);
      console.log(email);
      console.log(initialDepartment);

      if (response.data.success) {
        toast.success("Login Successfull")
        navigate(`/faculty-Details/${name}/${email}/${initialDepartment}`);
      } else {
        setError("Invalid credentials! Please try again.");
      }
    } catch (err) {
      setError("Error logging in. Please try again later.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-40">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 text-gray-600 hover:text-blue-700 transition hover:cursor-pointer"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Faculty Login</h2>

        {/* Department Display (Instead of Dropdown) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Department</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700">
            {initialDepartment || "N/A"}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email ID</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {passwordVisible ? "👁️" : "🙈"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        {/* Login Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition hover:cursor-pointer"
          onClick={FacultyDB}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default FacultyLogin;
