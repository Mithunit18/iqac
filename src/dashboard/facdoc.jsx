import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { FiDownload } from "react-icons/fi";

function FacDoc() {
  const { departmentId } = useParams();
  const location = useLocation();
  const section = location.state?.section || "Academic Details";

  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [classId, setClassId] = useState("");

  useEffect(() => {
    const deptName = location.state?.departmentName;
    const clsId = location.state?.classId;

    console.log("Department Name:", deptName);
    console.log("Class ID:", clsId);

    setDepartmentName(deptName || "DefaultDepartment");
    setClassId(clsId || "");

    if (deptName && clsId && section) {
      fetchDocuments(deptName, clsId, section);
    }
  }, [section, location]);

  const fetchDocuments = async (deptName, clsId, section) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/faculty/documents`, {
        params: { departmentName: deptName, classId: clsId, section },
      });
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = e.target.files[0];

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    if (!departmentName || !classId || !section) {
      alert("Department name, Class ID, and Section are required");
      return;
    }

    formData.append("document", file);
    formData.append("departmentName", departmentName);
    formData.append("classId", classId);
    formData.append("section", section);

    try {
      setUploading(true);
      await axios.post("http://localhost:5002/api/faculty/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchDocuments(departmentName, classId, section);
    } catch (error) {
      console.error("Error uploading document:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Class {classId} - {section} Documents
        </h2>

        {!departmentName && (
          <p className="text-red-600 text-center mb-4">
            Department Name is required to upload documents.
          </p>
        )}

        <div className="mb-8">
          <label
            htmlFor="file-upload"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading || !departmentName}
          />
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Uploaded Documents</h3>
        {documents.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No documents uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="p-4 bg-gray-100 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium text-gray-800 truncate">{doc.documentName}</p>
                  <a
                    href={`http://localhost:5002/api/faculty/${doc.documentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FiDownload className="mr-2" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FacDoc;
