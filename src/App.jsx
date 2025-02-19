import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Toaster } from 'react-hot-toast';
import HodDashboard from './dashboard/HodDashboard';
import FacultyLogin from "./pages/facultylogin";
import Facultydept from "./dashboard/facultydept";
import Facultyclass from "./dashboard/facultyclass";
import AdminDashboard from './dashboard/AdminDashboard';
import IQACDashboard from './dashboard/IQACDashboard';
import ViewPage from './dashboard/View';
import DocumentViewer from "./dashboard/DocumentViewer";
import UploadDocument from "./dashboard/UploadDocument";
import ClassDetails from "./dashboard/ClassDetails";
import Facdoc from "./dashboard/facdoc";
import DepartmentDetails from "./dashboard/DepartmentDetails";
import Login from './pages/Login'; 

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Custom Hook for Setting HOD Data
const useInitializeHodData = () => {
  useEffect(() => {
    if (!localStorage.getItem("hodData")) {
      const hodData = {
        1: { name: "Kavitha", email: "kavitha@citchennai.net", password: "123As@121", department: "Information Technology" },
        2: { name: "Pavithra", email: "Pavithra@citchennai.net", password: "123As@122", department: "Computer Science" },
        3: { name: "john", email: "John@citchennai.net", password: "123As@123", department: "Electrical and Electronics" },
        4: { name: "harin", email: "harin@citchennai.net", password: "123As@124", department: "Mechanical Engineering" },
        5: { name: "saran", email: "saran@citchennai.net", password: "123As@125", department: "Civil Engineering" },
        6: { name: "doe", email: "doe@citchennai.net", password: "123As@126", department: "Electronics and Communication" },
        7: { name: "madhan", email: "madhan@citchennai.net", password: "123As@127", department: "Biotechnology" }
      };
      localStorage.setItem("hodData", JSON.stringify(hodData));
    }
  }, []);
};

function App() {
  const location = useLocation();
  const isIQACDashboard = location.pathname.includes("iqac-dashboard");
  useInitializeHodData();

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className={`min-h-screen bg-cover bg-center flex items-center justify-center ${isIQACDashboard ? '' : 'bg-[url("/src/assets/citimage1.jpg")]'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload-class/:classId/:departmentName" element={<ClassDetails />} />
          <Route path="/view-department/:departmentId" element={<DepartmentDetails />} />
          <Route path="/view-class/:classId/:departmentName" element={<ViewPage />} />
          <Route path="/view-facultyclass/:classId/:departmentName" element={<Facultyclass/>}/>
          <Route path="/document-viewer" element={<DocumentViewer />} />
          <Route path="/upload/:deptName" element={<UploadDocument />} />
          <Route path="/view-faclogin/:classId/:departmentName" element={<FacultyLogin/>}/>
          <Route path="/view-/facultydoc/:departmentId" element={<Facdoc/>}/>
          <Route path="hod-dashboard" element={
            <ProtectedRoute>
              <HodDashboard />
            </ProtectedRoute>
          } />
          <Route path="faculty-dept" element={
            <ProtectedRoute>
              <Facultydept />
            </ProtectedRoute>
          } />
          <Route path="admin-dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="iqac-dashboard" element={
            <ProtectedRoute>
              <IQACDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
