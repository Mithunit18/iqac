import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CloudUpload, FileText, DownloadCloud } from 'lucide-react';

const DocumentViewer = () => {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Get the department name from state passed via navigate
  const location = useLocation();
  const departmentName = location.state?.departmentName;

  // Fetch documents for the selected department
  useEffect(() => {
    if (departmentName) {
      fetchDocuments(departmentName);
    }
  }, [departmentName]);

  const fetchDocuments = async (dept) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/documents/${dept}`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    const file = e.target.files[0];

    if (!file) {
      alert('Please select a file to upload');
      setUploading(false);
      return;
    }

    formData.append('document', file);
    formData.append('departmentName', departmentName);

    try {
      const response = await axios.post('http://localhost:5002/api/upload', formData);
      console.log('Document uploaded successfully:', response.data);
      fetchDocuments(departmentName); // Refresh documents after upload
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative top-13 bg-gray-50 py-10 px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">{departmentName} Documents</h1>

        {/* File Upload Section */}
        <div className="mb-6 flex justify-center">
          <label className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-all shadow-lg">
            <CloudUpload className="w-5 h-5" />
            <span>{uploading ? 'Uploading...' : 'Upload Document'}</span>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* Display uploading status */}
        {uploading && (
          <div className="flex justify-center mb-4">
            <p className="text-lg text-yellow-500">Uploading... Please wait.</p>
          </div>
        )}

        {/* Document List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Uploaded Documents</h2>
          {documents.length === 0 ? (
            <p className="text-lg text-gray-500">No documents uploaded yet.</p>
          ) : (
            <ul className="space-y-4 max-h-96 overflow-y-auto">
              {documents.map((doc) => (
                <li
                  key={doc._id}
                  className="bg-gray-100 border-l-4 border-blue-500 p-4 rounded-md shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-6 h-6 text-gray-600" />
                      <p className="text-lg font-medium text-gray-800">{doc.documentName}</p>
                    </div>
                    <a
                      href={`http://localhost:5002/api/document/${doc.documentName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
                    >
                      <DownloadCloud className="w-5 h-5" />
                      <span>Download</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
