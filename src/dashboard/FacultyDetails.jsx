import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const FacultyDetails = () => {
  const { name, email, initialDepartment} = useParams(); // Get name and email from URL params
  const navigate = useNavigate();
  console.log(initialDepartment);

  // Dummy faculty details (Replace with API data if needed)
  const facultyInfo = {
    studies: "Artificial Intelligence & Data Science",
    qualification: "Ph.D. in Computer Science",
    age: 40,
    experience: "15+ years in academia",
    research: "Machine Learning, Deep Learning",
  };

  return (
    <div className="relative top-15 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      {/* Faculty Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center transform transition duration-300 hover:scale-105">
        
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-blue-600 text-7xl" />
        </div>

        <h2 className="text-3xl font-bold text-blue-700 mb-2">{name}</h2>
        <p className="text-gray-500 text-sm mb-4">{email}</p>

        {/* Faculty Details */}
        <div className="text-gray-800 text-left space-y-3">
          <p className="flex justify-between border-b pb-2">
            <span className="font-semibold">Studies:</span> {facultyInfo.studies}
          </p>
          <p className="flex justify-between border-b pb-2">
            <span className="font-semibold">Qualification:</span> {facultyInfo.qualification}
          </p>
          <p className="flex justify-between border-b pb-2">
            <span className="font-semibold">Age:</span> {facultyInfo.age}
          </p>
          <p className="flex justify-between border-b pb-2">
            <span className="font-semibold">Experience:</span> {facultyInfo.experience}
          </p>
          <p className="flex justify-between">
            <span className="font-semibold">Research Areas:</span> {facultyInfo.research}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between space-x-4">
          <button
            className="w-1/2 bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
          <button
            className="w-1/2 bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
            onClick={() => navigate(`/faculty-upload/${email}/${initialDepartment}`)}
          >
            📤 Upload Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetails;
