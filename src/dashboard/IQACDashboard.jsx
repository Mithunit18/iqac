import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Building, Monitor, Cpu, Code, Database, User } from "lucide-react";

const IQAC = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDepartments([
      { id: 1, name: "Information Technology", icon: <Code className="w-10 h-10 text-purple-500" /> },
      { id: 2, name: "Computer Science", icon: <Monitor className="w-10 h-10 text-blue-500" /> },  
      { id: 4, name: "Mechanical", icon: <Cpu className="w-10 h-10 text-yellow-500" /> }, 
      { id: 5, name: "Civil", icon: <Database className="w-10 h-10 text-orange-500" /> }, 
      { id: 6, name: "Electronics and Communication", icon: <Cpu className="w-10 h-10 text-indigo-500" /> }, 
      { id: 7, name: "Biotechnology", icon: <Monitor className="w-10 h-10 text-teal-500" /> },  
      { id: 3, name: "Electrical and Electronics", icon: <Database className="w-10 h-10 text-green-500" /> }, // ID: 3
      
    ]);
  }, []);


  //{ id: 8, name: "AIDS", icon: <User className="w-10 h-10 text-pink-500" /> }, // ID: 5
  //{ id: 9, name: "AIML", icon: <Building className="w-10 h-10 text-red-500" /> }, // ID: 6
  
  const handleCardClick = (department) => {
    navigate("/document-viewer", {
      state: { departmentName: department },  // Passing the department name as state
    });
  };

  return (
    <div className="relative top-30 bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          IQAC Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white shadow-xl rounded-2xl p-6 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
              onClick={() => handleCardClick(dept.name)}
            >
              <div className="flex items-center space-x-4">
                {dept.icon}
                <h2 className="text-2xl font-semibold text-gray-800">{dept.name}</h2>
              </div>
              <p className="mt-4 text-gray-600">
                Manage documents and activities for the {dept.name} department.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IQAC;
