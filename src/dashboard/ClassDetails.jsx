import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FiDownload } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";

const ClassDetails = () => {
  const { classId, departmentName } = useParams();
  const decodedDepartmentName = decodeURIComponent(departmentName); // Ensure proper decoding
  const location = useLocation();
  const section = location.state?.section || "Academic Details";

  const [facultyDocuments, setFacultyDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFacultyDocuments();
  }, [classId, decodedDepartmentName]);

  const fetchFacultyDocuments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/hod/document/department/${decodedDepartmentName}`
      );
      setFacultyDocuments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching faculty documents:", error);
      setFacultyDocuments([]);
    }
  };

  const handleUploadToDocuments = async (doc) => {
    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:5002/api/hod/upload",
        {
          documentName: doc.documentName,
          documentUrl: doc.documentUrl,
          departmentName: decodedDepartmentName,
          classId,
        }
      );
      console.log("Document uploaded to Documents collection:", response.data);
      alert("Document uploaded successfully!");
      fetchFacultyDocuments(); // Refresh document list after upload
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("Failed to upload document.");
    }
    setUploading(false);
  };

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Class {classId} - {section} Documents
        </h2>

        {/* Display Faculty Documents */}
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">
          Faculty Documents
        </h3>
        {facultyDocuments.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No faculty documents available.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {facultyDocuments.map((doc) => (
              <div
                key={doc._id}
                className="p-4 bg-gray-100 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium text-gray-800 truncate">
                    {doc.documentName}
                  </p>
                  <div className="flex items-center space-x-4">
                    <a
                      href={`http://localhost:5002${doc.documentUrl}`} // Ensure correct URL
                      download={doc.documentName} // Force download instead of opening
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                    >
                      <FiDownload className="mr-2" />
                      <span>Download</span>
                    </a>

                    <button
                      onClick={() => handleUploadToDocuments(doc)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700 transition-colors"
                      disabled={uploading}
                    >
                      <IoCloudUploadOutline className="mr-2" />
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;
