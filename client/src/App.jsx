import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/candidate/Dashboard";
import Jobs from "./pages/candidate/Jobs";
import Profile from "./pages/candidate/Profile";
import MyApplications from "./pages/candidate/MyApplications";
import JobDetails from "./pages/candidate/JobDetails";
import Companies from "./pages/recruiter/Companies";
import AddCompany from "./pages/recruiter/AddCompany";
import EditCompany from "./pages/recruiter/EditCompany";
import CompanyDetails from "./pages/recruiter/CompanyDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import AddJob from "./pages/recruiter/AddJob";
import EditJob from "./pages/recruiter/EditJob";
import JobApplicants from "./pages/recruiter/JobApplicants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Candidate Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<MyApplications />} />

          {/* Recruiter Routes */}
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/add" element={<AddCompany />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />
          <Route path="/companies/edit/:id" element={<EditCompany />} />
        </Route>

{/* Recruiter Job Routes */}

<Route path="/recruiter/jobs" element={<RecruiterJobs />} />

<Route path="/recruiter/jobs/add" element={<AddJob />} />

<Route path="/recruiter/jobs/edit/:id" element={<EditJob />} />

<Route
  path="/recruiter/jobs/:id/applicants"
  element={<JobApplicants />}
/>
        {/* Invalid Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;