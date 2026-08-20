import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/job-tracker" element={<JobTracker />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;