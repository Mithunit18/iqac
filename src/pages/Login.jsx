import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const hodData = JSON.parse(localStorage.getItem("hodData"));

    // Loop through the departments to check if the email and password match
    let departmentId = null;
    for (let id in hodData) {
      if (hodData[id].email === email && hodData[id].password === password) {
        departmentId = id;
        break;
      }
    }

    if (departmentId) {
      // Store the departmentId in localStorage and redirect
      localStorage.setItem('loggedInDepartmentId', departmentId);
      localStorage.setItem('token', 'valid-token');  // Set a valid token for the session
      navigate(`/view-department/${departmentId}`); // Redirect to the department page
      toast.success("Login Succesfull");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
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
            onClick={() => navigate('/hod-dashboard')}
            className="w-full p-3 mt-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-400 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
