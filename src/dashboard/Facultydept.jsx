import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Monitor, Cpu, Code, Database } from "lucide-react";
import { FiMenu } from "react-icons/fi"; // Importing FiMenu

function Facultydept() {
    const [departments, setDepartments] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false); // Added menuOpen state
    const navigate = useNavigate();

    useEffect(() => {
        setDepartments([
            { id: 1, name: "Information Technology", icon: <Code className="w-10 h-10 text-purple-500" /> },
            { id: 2, name: "Computer Science", icon: <Monitor className="w-10 h-10 text-blue-500" /> },
            { id: 4, name: "Mechanical", icon: <Cpu className="w-10 h-10 text-yellow-500" /> },
            { id: 5, name: "Civil", icon: <Database className="w-10 h-10 text-orange-500" /> },
            { id: 6, name: "Electronics and Communication", icon: <Cpu className="w-10 h-10 text-indigo-500" /> },
            { id: 7, name: "Biotechnology", icon: <Monitor className="w-10 h-10 text-teal-500" /> },
            { id: 3, name: "Electrical and Electronics", icon: <Database className="w-10 h-10 text-green-500" /> },
        ]);
    }, []);
    const handleViewClick = (departmentId) => {
        const loggedInDepartmentId = localStorage.getItem('loggedInDepartmentId');
        
        if (!loggedInDepartmentId) {
          navigate("/login");
        } else if (parseInt(loggedInDepartmentId) !== departmentId) {
          alert("You are not authorized to view this department.");
        } else {
          navigate(`/view-facultyclass/${departmentId}`);
        }
    };
    const handleLogout = () => {
        // Clear authentication data if needed
        navigate('/login');
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
                <div className="absolute right-4 top-40 bg-white shadow-xl rounded-4xl p-3 z-20 border border-gray-200 hover:bg-gray-300 transition">
                    <ul className="list-none p-0 m-0">
                        <li
                            className="py-2 cursor-pointer hover:text-blue-900 "
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
                            <div className="flex items-center space-x-4">
                                {department.icon}
                                <h2 className="text-lg font-semibold text-gray-800">{department.name}</h2>
                            </div>
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

export default Facultydept;
