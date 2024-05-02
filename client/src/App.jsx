import React from "react";
import Navbar from "./components/layout/Navbar";
import CustomFooter from "./components/layout/customFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TutorProfile from "./pages/TutorProfile";
import TutorProfilePage from "./pages/TutorProfilePage";
import EditTutorProfilePage from "./pages/EditTutorProfilePage";
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
          <Route path="/profile" element={<EditTutorProfilePage />} />
          <Route path="/" element={<TutorProfile />} />
          <Route path="/tutor/:userId" element={<TutorProfilePage />} />
        </Routes>
        <ToastContainer />
        <CustomFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
