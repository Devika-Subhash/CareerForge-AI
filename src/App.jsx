import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewPrep from "./pages/InterviewPrep";
import JobTracker from "./pages/JobTracker";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/resume-analyzer"
              element={
                <ProtectedRoute>
                  <ResumeAnalyzer />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interview-prep"
              element={
                <ProtectedRoute>
                  <InterviewPrep />
                </ProtectedRoute>
              }
            />

            <Route
              path="/job-tracker"
              element={
                <ProtectedRoute>
                  <JobTracker />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;