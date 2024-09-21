import React from "react";
import Navbar from "./components/layout/Navbar";
import CustomFooter from "./components/layout/CustomFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TutorProfile from "./pages/TutorProfile";
import TutorProfilePage from "./pages/TutorProfilePage";
import Dashboard from "./pages/Dashboard";
import LoginConfirmation from "./components/layout/LoginConfirmation";
import SuccessPayment from "./components/layout/SuccessPayment";
import CancelledPayment from "./components/layout/CancelledPayment";
import LandingPage from "./pages/LandingPage"; // Import the LandingPage component
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  // Assuming root app element has an ID of 'root'
  Modal.setAppElement("#root");
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Default route set to LandingPage */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tutor-profile" element={<TutorProfile />} />
          <Route path="/tutor/:userId" element={<TutorProfilePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/confirm" element={<LoginConfirmation />} />
          <Route path="/success" element={<SuccessPayment />} />
          <Route path="/cancel" element={<CancelledPayment />} />
        </Routes>
        <ToastContainer />
        <CustomFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
