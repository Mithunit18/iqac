import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

// Sample list of classes and departments
const classesData = {
  1: [
    { id: 1, name: "Class A" },
    { id: 2, name: "Class B" },
    { id: 3, name: "Class C" },
    { id: 4, name: "Class D" },
  ],
  2: [
    { id: 1, name: "Class A" },
    { id: 2, name: "Class B" },
    { id: 3, name: "Class C" },
    { id: 4, name: "Class D" },
  ],
  3: [
    { id: 1, name: "Class A" },
    { id: 2, name: "Class B" },
    { id: 3, name: "Class C" },
    { id: 4, name: "Class D" },
  ],
  4: [
    { id: 1, name: "Class A" },
    { id: 2, name: "Class B" },
    { id: 3, name: "Class C" },
    { id: 4, name: "Class D" },
  ],
  5: [
    { id: 1, name: "Class A" },
    { id: 2, name: "Class B" },
    { id: 3, name: "Class C" },
    { id: 4, name: "Class D" },
  ],
  6: [
    { id: 1, name: "Class A" },
    { id: 2, name: "Class B" },
    { id: 3, name: "Class C" },
    { id: 4, name: "Class D" },
  ],
  7: [
    { id: 1, name: "Class A" },
    { id: 2, name: "Class B" },
    { id: 3, name: "Class C" },
    { id: 4, name: "Class D" },
  ],
};

const departmentNames = {
  1: "Information Technology",
  2: "Computer Science",
  3: "Electrical and Electronics",
  4: "Mechanical Engineering",
  5: "Civil Engineering",
  6: "Electronics and Communication",
  7: "Biotechnology",
};

const DepartmentDetails = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [departmentClasses, setDepartmentClasses] = useState([]);
  const [departmentName, setDepartmentName] = useState("");

  // Convert departmentId to a number
  const numericDepartmentId = Number(departmentId);

  useEffect(() => {
    // Fetch the department name and classes based on the departmentId
    const department = departmentNames[numericDepartmentId] || "Unknown Department";
    setDepartmentName(department);

    const classes = classesData[numericDepartmentId] || [];
    setDepartmentClasses(classes);
  }, [numericDepartmentId]);

  const handleClassViewClick = (classId) => {
    navigate(`/view-class/${classId}/${departmentName}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      <header className="bg-gradient-to-r from-blue-500 to-blue-900 text-white p-4 w-full mt-28 z-10 relative shadow-lg rounded-b-lg flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider">{departmentName} - Classes</h1>
        <div className="relative">
          <button
            className="bg-transparent border-none text-2xl cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <FiMenu />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 z-20 border border-gray-200">
              <Link
                to="/hod-dashboard"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow p-6 w-full">
        <h2 className="text-2xl font-semibold mb-4">Classes for {departmentName}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center p-5">
          {departmentClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between transition-transform duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl cursor-pointer"
              onClick={() => handleClassViewClick(cls.id)}
            >
              <h2 className="text-lg font-bold">{cls.name}</h2>
              <p className="text-gray-600 text-sm">Coordinator XXXX.</p>
              <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-600">
                View
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DepartmentDetails;
