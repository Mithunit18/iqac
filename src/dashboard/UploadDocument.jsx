import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UploadDocument = () => {
  const { deptName } = useParams();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await axios.post(`http://localhost:5002/api/upload/${deptName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading document:", error);
      setMessage("Error uploading document. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Upload Document for {deptName}
      </h1>

      {message && <p className="text-center text-xl text-red-600">{message}</p>}

      <div className="flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/2">
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 w-full border-2 p-2 border-gray-300 rounded-md"
          />
          <button
            onClick={handleUpload}
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
