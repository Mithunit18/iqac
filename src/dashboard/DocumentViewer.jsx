import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FileText, DownloadCloud, ClipboardList } from 'lucide-react';
import TaskAssignModal from './TaskAssignModal';

const DocumentViewer = () => {
  const [documents, setDocuments] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Manually added tasks
  const tasks = [
    { id: 1, name: "Prepare semester report" },
    { id: 2, name: "Update project guidelines" },
    { id: 3, name: "Organize guest lecture" },
    { id: 4, name: "Conduct faculty training" },
    { id: 5, name: "Arrange internship program" },
    { id: 6, name: "Update course material" }
  ];

  const location = useLocation();
  const departmentName = location.state?.departmentName;

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

  const handleTaskSelection = (taskId) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(taskId)
        ? prevSelected.filter((id) => id !== taskId)
        : [...prevSelected, taskId]
    );
  };

  const handleTaskAssignment = async (departmentId) => {
    try {
      await axios.post('http://localhost:5002/api/assign-tasks', {
        departmentId,
        tasks: selectedTasks,
      });
      setIsTaskModalOpen(false);
      setSelectedTasks([]); // Reset selection
    } catch (error) {
      console.error('Error assigning tasks:', error);
    }
  };

  return (
    <div className="relative top-13 bg-gray-50 py-10 px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          {departmentName} Documents
        </h1>

        {/* Assign Task Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:cursor-pointer"
          >
            <ClipboardList className="w-5 h-5" />
            <span>Assign Task</span>
          </button>
        </div>

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

      {/* Task Assignment Modal */}
      <TaskAssignModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        department={{ name: departmentName }}
        tasks={tasks} // Manually added tasks
        selectedTasks={selectedTasks}
        onTaskSelection={handleTaskSelection}
        onTaskAssignment={handleTaskAssignment}
      />
    </div>
  );
};

export default DocumentViewer;
