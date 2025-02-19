import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import toast from "react-hot-toast";

const HOD = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const departments = [
    { id: 1, name: "Information Technology" },
    { id: 2, name: "Computer Science" },
    { id: 3, name: "Electrical and Electronics" },
    { id: 4, name: "Mechanical" },
    { id: 5, name: "Civil" },
    { id: 6, name: "Electronics and Communication" },
    { id: 7, name: "Biotechnology" },
  ];

  const notifications = [
    "New task assigned: Prepare semester report",
    "Deadline reminder: Upload project reports",
    "Meeting scheduled for curriculum update",
    "Guest lecture on AI scheduled for next week",
    "New document uploaded by faculty",
  ];

  const handleViewClick = (departmentId) => {
    const loggedInDepartmentId = localStorage.getItem("loggedInDepartmentId");

    if (!loggedInDepartmentId) {
      navigate("/login");
    } else if (parseInt(loggedInDepartmentId) !== departmentId) {
      alert("You are not authorized to view this department.");
    } else {
      navigate(`/view-department/${departmentId}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInDepartmentId");
    window.location.reload();
  };

  const handleNotification = () => {
    const randomIndex = Math.floor(Math.random() * notifications.length);
    toast(notifications[randomIndex]); // Show a random notification
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-900 text-white p-4 w-full mt-28 z-10 relative shadow-lg rounded-b-lg">
        <h1 className="text-xl font-bold tracking-wider">Departments Dashboard</h1>
        <button
          className="bg-transparent border-none text-2xl cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <FiMenu />
        </button>
      </header>

      {menuOpen && (
        <div className="absolute right-4 top-40 bg-white shadow-xl rounded-lg p-3 z-20 border border-gray-200">
          <ul className="list-none p-0 m-0">
            <li
              className="py-2 cursor-pointer hover:text-blue-900"
              onClick={handleNotification}
            >
              Notification
            </li>
            <li
              className="py-2 cursor-pointer hover:text-blue-900"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}

      <main className="flex-grow p-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
          {departments.map((department) => (
            <div
              key={department.id}
              className="bg-white shadow-lg rounded-lg p-6 w-full transition-transform duration-300 hover:transform hover:-translate-y-3 hover:shadow-2xl hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-800">{department.name}</h2>
              <button
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
                onClick={() => handleViewClick(department.id)}
              >
                View Department
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HOD;
