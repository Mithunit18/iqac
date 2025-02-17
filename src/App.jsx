import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Toaster } from 'react-hot-toast';
import HodDashboard from './dashboard/HodDashboard';
import FacultyDashboard from './dashboard/FacultyDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import IQACDashboard from './dashboard/IQACDashboard';
import ViewPage from './dashboard/View';
import DepartmentDetail from "./dashboard/DepartmentDetail";


// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  const location = useLocation(); // Get the current route location
  const isIQACDashboard = location.pathname.includes("iqac-dashboard");

  return (
    <>
      <Navbar />

      <Toaster position="top-center" reverseOrder={false} />

      <div
        className={`min-h-screen bg-cover bg-center flex items-center justify-center ${isIQACDashboard ? '' : 'bg-[url("/src/assets/citimage1.jpg")]'}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/class/:classId" element={<ViewPage />} />
          <Route path="/department/:deptId" element={<DepartmentDetail />} />

          {/* Protected Dashboard Routes */}
          <Route path="hod-dashboard" element={
            <ProtectedRoute>
              <HodDashboard />
            </ProtectedRoute>
          } />
          <Route path="faculty-dashboard" element={
            <ProtectedRoute>
              <FacultyDashboard />
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
