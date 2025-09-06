import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import JobListings from "../pages/JobListings";
import JobDetails from "../pages/JobDetails";
import Applications from "../pages/Applications";
import SavedJobs from "../pages/SavedJobs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import ProtectedRoute from "../components/ProtectedRoute"; // ✅ NEW
import CreateJob from "../pages/CreateJob";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobListings />
            </ProtectedRoute>
          }
        />
       

<Route
  path="/create-job"
  element={
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <CreateJob />
    </ProtectedRoute>
  }
/>


        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <Applications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
