import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Import Star icon
import clogo2 from '../assets/clogo2.jpg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';
  const isIQACDashboard = location.pathname.startsWith('/iqac-dashboard');

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInDepartmentId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleGenerate = () => {
    console.log('Generate button clicked!');
    // Add the function logic here (e.g., generating reports, exporting data)
  };

  const handleNavigation = () => {
    if (isIQACDashboard) {
      handleGenerate();
    } else {
      navigate('/');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='fixed left-0 top-0 z-50 w-full flex items-center justify-between p-4 shadow-lg bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 mb-36'>
      
      {/* Left: Logo */}
      <div className='pl-8 cursor-pointer hover:scale-105 transition-transform duration-300'>
        <img 
          src={clogo2} 
          alt="College Logo" 
          className='h-20 w-auto rounded-full shadow-xl border-2 border-white' 
        />
      </div>

      {/* Center: College Name */}
      <div className='flex-1 text-center'>
        <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-white drop-shadow-md'>
          CHENNAI INSTITUTE OF TECHNOLOGY
        </span>
      </div>

      {/* Right: Desktop Navigation Buttons */}
      <div className='hidden md:flex space-x-4 pr-8'>
        <button 
          className={`px-5 py-2 flex items-center gap-2 text-white font-semibold rounded-full transition-all duration-300 ${isIQACDashboard ? 'bg-green-600 hover:bg-green-700' : 'bg-black hover:bg-gray-800'} hover:scale-105`} 
          onClick={handleNavigation}
        >
          {isIQACDashboard && <FaStar className="text-yellow-400" />} {/* Star Icon */}
          {isIQACDashboard ? 'GENERATE' : 'HOME'}
        </button>
        {isLoggedIn && !isHomePage && (
          <button
            onClick={handleLogout}
            className='px-5 py-2 text-white font-semibold rounded-full bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300'
          >
            LOGOUT
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className='md:hidden'>
        <button 
          className='text-white p-2 bg-black rounded-full'
          onClick={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className='absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4 w-48'>
          <button 
            onClick={handleNavigation}
            className={`w-full text-center flex items-center gap-2 justify-center py-2 text-white font-semibold rounded-full ${isIQACDashboard ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-600'} mb-2`}
          >
            {isIQACDashboard && <FaStar className="text-yellow-400" />} {/* Star Icon */}
            {isIQACDashboard ? 'GENERATE' : 'HOME'}
          </button>
          {isLoggedIn && !isHomePage && (
            <button
              onClick={handleLogout}
              className='w-full text-center py-2 text-white font-semibold rounded-full bg-red-600 hover:bg-red-700'
            >
              LOGOUT
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
