import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const HOD = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(0); // To track the position of the menu button
  const navigate = useNavigate();

  const handleViewClick = (classId) => {
    navigate(`/class/${classId}`);
  };

  const handleMenuButtonClick = (e) => {
    const buttonRect = e.target.getBoundingClientRect(); // Get the position of the menu button
    setButtonPosition(buttonRect.bottom); // Set the bottom position of the button for dropdown
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-900 text-white p-4 w-full mt-28 z-10 relative">
        <div className="flex flex-col sm:flex-row sm:space-x-4 sm:items-center">
          <h1 className="text-xl font-bold">DEPARTMENT OF INFORMATION TECHNOLOGY</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-l font-bold hidden sm:block rounded-xl p-3 hover:bg-sky-700 hover:cursor-pointer">UPLOAD</button>
          <button
            className="bg-transparent border-none text-2xl cursor-pointer"
            onClick={handleMenuButtonClick}
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Toggle Menu */}
      {menuOpen && (
        <div
          className="absolute right-4 bg-white shadow-lg rounded-lg p-4 z-20"
          style={{ top: `${buttonPosition + 10}px` }} // Position the dropdown just below the button
        >
          <ul className="list-none p-0 m-0">
            <li className="py-2 cursor-pointer hover:text-blue-900">NOTIFICATION</li>
            <li className="py-2 cursor-pointer hover:text-blue-900">LogOut</li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow p-6 w-full">
        <div className="flex flex-wrap gap-6 justify-center p-5">
          {/* Cards */}
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 w-80 h-80 flex flex-col justify-between transition-transform duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl"
              >
                <h2 className="text-lg font-bold">Class {String.fromCharCode(65 + index)}</h2>
                <p className="text-gray-600 text-sm">Coordinator XXXX.</p>
                <button
                  className="bg-blue-900 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-600"
                  onClick={() => handleViewClick(index + 1)}
                >
                  View
                </button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default HOD;
