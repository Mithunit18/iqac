import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FacultyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Assign default values
    let departmentName = "CSE";
    let classId = "123";

    // Navigate directly to the view-docs page
    navigate(`/view-class/${classId}/${departmentName}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Faculty Login
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-md hover:bg-gradient-to-l hover:from-blue-500 hover:to-blue-300 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/faculty-dept")}
            className="w-full p-3 mt-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-400 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default FacultyLogin;
