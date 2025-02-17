// IQACDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IQACDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const departments = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Mechanical Engineering' },
    { id: 3, name: 'Electrical Engineering' },
    { id: 4, name: 'Information Technology' },
    { id: 5, name: 'AIDS' },
    { id: 6, name: 'AIML' },
    { id: 7, name: 'Civil Engineering' },
    { id: 8, name: 'Biotechnology' },
  ];

  const handleDeptClick = async (deptId) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/documents/${deptId}`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  return (
    <div className="p-5 bg-gray-100">
      <h1 className="text-2xl font-bold mb-5 text-center">IQAC Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white border border-gray-300 rounded-lg p-5 shadow hover:shadow-lg cursor-pointer text-center"
            onClick={() => handleDeptClick(dept.id)}
          >
            <h2 className="text-xl font-semibold mb-3">{dept.name}</h2>
          </div>
        ))}
      </div>
      <div className="mt-10">
        {documents.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold mb-3">Documents:</h2>
            <ul>
              {documents.map((doc) => (
                <li key={doc._id} className="mb-2">
                  <h3 className="text-lg font-semibold">{doc.title}</h3>
                  <p>{doc.content}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center">No documents available for this department.</p>
        )}
      </div>
    </div>
  );
};

export default IQACDashboard;
