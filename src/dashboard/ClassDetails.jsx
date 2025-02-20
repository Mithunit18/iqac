import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FiDownload } from "react-icons/fi";
import { IoCloudUploadOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const ClassDetails = () => {
  const { classId, departmentName } = useParams();
  const decodedDepartmentName = decodeURIComponent(departmentName);
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
      await axios.post("http://localhost:5002/api/hod/upload", {
        documentName: doc.documentName,
        documentUrl: doc.documentUrl,
        departmentName: decodedDepartmentName,
        classId,
      });

      toast.success("Document uploaded successfully!");
      fetchFacultyDocuments(); // Refresh document list
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document.");
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Class {classId} - {section} Documents
        </h2>

        {/* List of Faculty Documents */}
        <h3 className="text-xl font-semibold text-gray-700 mt-4">Faculty Documents</h3>
        <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-2">
          {facultyDocuments.length > 0 ? (
            facultyDocuments.map((doc) => (
              <div
                key={doc._id}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              >
                <span className="text-gray-800 truncate">{doc.documentName}</span>
                <div className="flex space-x-3">
                  <a
                    href={`http://localhost:5002${doc.documentUrl}`}
                    download={doc.documentName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition flex items-center"
                  >
                    <FiDownload className="mr-1" /> Download
                  </a>

                  <button
                    onClick={() => handleUploadToDocuments(doc)}
                    className="bg-green-600 text-white px-4 py-1 rounded-lg flex items-center hover:bg-green-700 transition"
                    disabled={uploading}
                  >
                    <IoCloudUploadOutline className="mr-1" />
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No faculty documents available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
