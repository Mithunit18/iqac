import React from "react";
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  const departments = [
    { id: 1, name: "Information Technology" },
    { id: 2, name: "Computer Science" },
    { id: 3, name: "Electrical and Electronics" },
    { id: 4, name: "Mechanical Engineering" },
    { id: 5, name: "Civil Engineering" },
    { id: 6, name: "Electronics and Communication" },
    { id: 7, name: "Biotechnology" },
  ];

  // Handle Click Function
  const handleClick = (departmentName) => {
    navigate(`/faculty-login?department=${encodeURIComponent(departmentName)}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-40">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-10 drop-shadow-lg">
        Faculty Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 max-w-6xl bg-white shadow-xl rounded-3xl">
        {departments.map((department) => (
          <div
            key={department.id}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl font-bold mb-4">
              {department.name.charAt(0)}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{department.name}</h2>
            <p
              className="text-gray-600 mt-2 hover:cursor-pointer hover:text-red-600"
              onClick={() => handleClick(department.name)}
            >
              Click for more details
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyDashboard;
