import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/candidate/Dashboard";
import Jobs from "./pages/candidate/Jobs";
import Profile from "./pages/candidate/Profile";
import MyApplications from "./pages/candidate/MyApplications";
import JobDetails from "./pages/candidate/JobDetails";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/applications" element={<MyApplications />} />
        </Route>

        {/* Catch-all — koi bhi unknown URL → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;