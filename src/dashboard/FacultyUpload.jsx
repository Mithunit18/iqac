import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaFileAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const FacultyUpload = () => {
  const { email, initialDepartment } = useParams(); // Get faculty email from URL params
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch uploaded documents
  useEffect(() => {
    console.log("Fetching documents for email:", email); // Debugging log
    if (email) fetchDocuments(); // Only call if email exists
  }, [email]);

  const fetchDocuments = async () => {
    console.log("Fetching documents for:", email); // Debugging

    if (!email) {
      console.error("Email is undefined!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5002/api/faculty/documents/${email}`);
      console.log("Documents fetched:", response.data); // Debugging response
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error.response?.data || error.message);
    }
  };

  // Handle File Selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle File Upload
  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file to upload.");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("emailId", email); // Match backend expectations
    formData.append("departmentName", initialDepartment);

    try {
      setLoading(true);
      console.log(email, initialDepartment); // Now correctly sent
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
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Upload Faculty Documents</h2>

        {/* File Upload Section */}
        <div className="flex flex-col items-center mb-4">
          <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800 transition">
            <FaCloudUploadAlt className="text-2xl" />
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span>{selectedFile ? selectedFile.name : "Choose a file"}</span>
          </label>

          <button
            className="mt-3 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {/* List of Uploaded Documents */}
        <h3 className="text-xl font-semibold text-gray-700 mt-4">Uploaded Documents</h3>
        <div className="mt-3 space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-300 rounded-md">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                <span className="flex items-center gap-2 text-gray-800">
                  <FaFileAlt className="text-blue-500" />
                  {doc.filename}
                </span>
                <a
                  href={`http://localhost:5002/uploads/${doc.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No documents uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyUpload;