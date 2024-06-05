// Improved Navbar with React Router's Link and better toggle handling
import React, { useState, useEffect } from "react";
import { FiMenu} from "react-icons/fi";
import logo from "../../assets/logo.png";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../features/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      const fetchProfileInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:7777/user/${authUser.userId}`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchProfileInfo();
    }
  }, [authUser]);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    alert('You have successfully logged out')
    navigate("/login");
  };

  return (
    <nav className="shadow-md w-full top-0 bg-gray-200 md:px-20">
      <div className="md:flex items-center justify-between text-white mr-6 text-xl md:px-10 px-7">
        <div className="font-bold md:flex items-center text-white">
          <Link to="/">
            <img src={logo} alt="logo" className="h-32 md:w-full" />
          </Link>
        </div>
        <button className="absolute right-10 top-7 cursor-pointer md:hidden mt-5 text-gray-800 z-10 hover:text-white" onClick={toggleMenu}>
          {isOpen ? <IoCloseSharp size={30} /> : <FiMenu size={30} />}
        </button>
        <div className={`${isOpen ? "flex" : "hidden"} md:flex items-center justify-center absolute md:relative inset-0 md:inset-auto bg-black md:bg-transparent bg-opacity-75 md:bg-opacity-0 transition-all duration-500 ease-in-out`}>
          <ul className="md:flex md:items-center md:space-x-4 md:space-y-0 space-y-4 text-base">
            {authUser ? (
              <>
                <li><Link to="/" className="md:hidden hover:text-blue-500 text-white">Home</Link></li>
                <li><Link to="/dashboard" className="md:text-gray-700 hover:text-blue-500">Edit Profile</Link></li>
                <li><button onClick={handleLogout} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:rounded-full">Logout</button></li>
                <li><img src={user?.avatarUrl} alt="avatar" className={`${isOpen ? "hidden" : "h-8 w-8 rounded-full object-cover"}`} /></li> 
                <li className={`${isOpen ? "hidden" : "text-black"}`}>
                  <p className="text-2xl">Hello!</p>
                  <p>{user?.username}</p>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/" className="hover:text-blue-500 md:text-black">Find a Tutor</Link></li>
                <li><Link to="/login" className="hover:text-blue-500 md:text-black">Login</Link></li>
                <li><Link to="/register" className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
