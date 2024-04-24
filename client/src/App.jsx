import React from "react";
import Navbar from "./components/layout/Navbar";
import CustomFooter from "./components/layout/customFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Results from './pages/Results'
import TutorProfile from './pages/TutorProfile'
import TutorProfilePage from "./pages/TutorProfilePage";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/results" element={<Results/>}/>
          <Route path="/" element={<TutorProfile/>}/>
          <Route path="/tutor/:userId" element={<TutorProfilePage/>}/>
        </Routes>
        <CustomFooter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
