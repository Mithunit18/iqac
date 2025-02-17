import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!role || !email || !password) {
      toast.error('Please fill all fields!');
      return;
    }
  
    console.log('Login Data:', { email, password, role });
  
    try {
      const response = await axios.post('http://localhost:5002/api/auth/login', {
        email,
        password,
        role,
      }, { withCredentials: true });  // This sends cookies along with the request
  
      if (response.status === 200) {
        toast.success('Login successful!');
  
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
  
        // Redirect based on role
        switch (role) {
          case 'hod':
            navigate('/hod-dashboard');
            break;
          case 'faculty':
            navigate('/faculty-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'iqac_admin':
            navigate('/iqac-dashboard');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Server error. Please try again later.');
      }
    }
  };
  
  

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-8 lg:px-20 py-10 space-y-4 md:space-y-0 md:space-x-8 relative"
      style={{ backgroundImage: "url('/src/assets/citimage1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0 w-full h-full"></div>
      <div className="bg-white shadow-md rounded p-6 w-full max-w-sm text-center z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">NEW USER</h1>
        <p className="text-gray-600 mb-4">Don't have an account yet?</p>
        <Link to="/signup">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer">
            Sign Up
          </button>
        </Link>
      </div>
      <div className="bg-white bg-opacity-80 shadow-md rounded p-6 w-full max-w-sm text-center z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">EXISTING USER!</h1>
        <p className="text-gray-600 mb-4">Login to your account</p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <select
            className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="hod">HOD</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
            <option value="iqac_admin">IQAC Admin</option>
          </select>

          <input
            type="email"
            id="email"
            placeholder="Enter your email..."
            className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            id="password"
            placeholder="Enter your Password..."
            className="block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full text-white bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 transition hover:cursor-pointer"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
