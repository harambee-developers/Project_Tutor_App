import React from "react";
import SearchAndFilter from "./components/features/SearchAndFilter";
import Navbar from "./components/layout/Navbar";
import CustomFooter from "./components/layout/customFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Register from './pages/Register'
import Results from './pages/Results'
import TutorProfile from './pages/TutorProfile'


function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/results" element={<Results/>}/>
          <Route path="/tutorprofile" element={<TutorProfile/>}/>
        </Routes>
        <CustomFooter/>
      </div>
    </BrowserRouter>
  );
}

export default App;
