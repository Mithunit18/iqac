import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DepartmentDetail = () => {
  const { deptId } = useParams();
  const [department, setDepartment] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // Fetch department details from the backend
    axios
      .get(`http://localhost:5002/api/departments/${deptId}`)
      .then((response) => {
        setDepartment(response.data);
        setUploadedFiles(response.data.files);
      })
      .catch((error) => {
        console.error("Error fetching department details:", error);
      });
  }, [deptId]);

  return (
    <div className="department-detail">
      {department && (
        <>
          <h2>{department.name} Department</h2>
          {uploadedFiles.length > 0 ? (
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DepartmentDetail;
