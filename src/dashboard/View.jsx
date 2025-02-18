import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewPage = () => {
  const { classId,departmentName } = useParams(); // Extract classId from URL params
  const navigate = useNavigate();
  
  // Titles for the sections
  const titles = [
    "Academic Details",
    "Research Details",
    "Placement Details",
    "Guest Lectures",
    "Workshops",
    "Achievements",
  ];

  // When a section's "View" button is clicked, navigate to ClassDetails
  const handleViewSection = (sectionIndex) => {
    const selectedSection = titles[sectionIndex];
    console.log(departmentName);
    navigate(`/upload-class/${classId}/${departmentName}`, {
      state: { section: selectedSection } // Pass the selected section to ClassDetails
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full relative top-28">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">
          Class {String.fromCharCode(64 + parseInt(classId))} - Overview
        </h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 py-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {titles.map((title, index) => (
            <div
              key={index}
              style={{ backgroundColor: "#f1eded" }}
              className="shadow-md rounded-lg p-6 h-96 w-90 flex flex-col justify-between transition-transform duration-300 hover:transform hover:-translate-y-3 hover:shadow-xl cursor-pointer"
            >
              <h2 className="text-lg font-bold mb-2">{title}</h2>
              <p className="text-gray-600 text-sm">
                This is the {title.toLowerCase()} section for Class{" "}
                {String.fromCharCode(64 + parseInt(classId))}.
              </p>
              <button
                className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-600"
                onClick={() => handleViewSection(index)}
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

export default ViewPage;
