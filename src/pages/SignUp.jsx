// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/api/auth/signup', {
        name,
        email,
        password,
        role
      });

      if (response.status === 201) {
        toast.success('User created successfully!', { duration: 2000 });
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'Server error';
      toast.error(errorMessage, { duration: 3000 });
    }
  };
  return (
    <div className='flex items-center justify-center pt-20'>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-sm">
        <h1 className='text-2xl font-bold text-gray-900 mb-4'>Sign Up</h1>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
          required
        >
          <option value="" disabled>Select your role</option>
          <option value="hod">HOD</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
          <option value="iqac_admin">IQAC Admin</option>
        </select>

        <input
          type="text"
          placeholder="Enter your name"
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full mb-4 hover:cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
