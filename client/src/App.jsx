import React from "react";
import Navbar from "./components/layout/Navbar";
import CustomFooter from "./components/layout/customFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TutorProfile from "./pages/TutorProfile";
import TutorProfilePage from "./pages/TutorProfilePage";
import EditTutorProfilePage from "./pages/EditTutorProfilePage";
import PrivateRoute from "./components/layout/PrivateRoute";
import LoginConfirmation from "./components/layout/LoginConfirmation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<TutorProfile />} />
          <Route path="/tutor/:userId" element={<TutorProfilePage />} />
          {/* Protected Routes */}
          <Route path="/profile" element={<PrivateRoute element={EditTutorProfilePage} />} />
          {/* Fallback Private Route (for any unmatched private routes) */}
          <Route path="/confirm" element={<PrivateRoute element={LoginConfirmation} />} />
        </Routes>
        <ToastContainer />
        <CustomFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
