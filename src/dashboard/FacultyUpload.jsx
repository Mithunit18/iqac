import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaFileAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const FacultyUpload = () => {
  const { email, initialDepartment } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) fetchDocuments();
  }, [email]);

  const fetchDocuments = async () => {
    if (!email) return;

    try {
      const response = await axios.get(`http://localhost:5002/api/faculty/documents/${email}`);
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error.response?.data || error.message);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file to upload.");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("emailId", email);
    formData.append("departmentName", initialDepartment);

    try {
      setLoading(true);
      await axios.post(`http://localhost:5002/api/faculty/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("File uploaded successfully!");
      setSelectedFile(null);
      fetchDocuments();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4 py-10 min-h-screen pt-24">
      <div className="bg-white shadow-lg rounded-2xl p-5 sm:p-6 w-full max-w-md text-center">
        <h2 className="text-xl sm:text-3xl font-bold text-blue-700 mb-4">Upload Faculty Documents</h2>

        {/* File Upload Section */}
        <div className="flex flex-col items-center mb-4">
          <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800 transition text-sm sm:text-base">
            <FaCloudUploadAlt className="text-2xl" />
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span>{selectedFile ? selectedFile.name : "Choose a file"}</span>
          </label>

          <button
            className="mt-3 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {/* List of Uploaded Documents */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mt-4">Uploaded Documents</h3>
        <div className="mt-3 space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-300 rounded-md w-full">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 p-2 rounded-md text-xs sm:text-base">
                <span className="flex items-center gap-2 text-gray-800 break-all">
                  <FaFileAlt className="text-blue-500" />
                  {doc.filename}
                </span>
                <a
                  href={`http://localhost:5002/uploads/${doc.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 mt-2 sm:mt-0"
                >
                  View
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyUpload;
