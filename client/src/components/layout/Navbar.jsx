import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../features/AuthContext";
import picture from "../../assets/profile_stock.jpg";

const Navbar = () => {
  const {user: authUser, logout } = useAuth();
  const [user, setUser] = useState(null)
  const [isopen, setOpen] = useState(false);
  const closeMenu = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    // Check if user data exists in localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData); // Assuming you have a way to set user data in your component state
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <nav className="shadow:md w-full top-0 bg-gray-200">
      {/* <!-- Logo and SearchBar placement --> */}
      <div className="md:flex items-center justify-between text-white mr-6 text-xl md:px-10 px-7">
        <div className="hidden font-bold md:flex items-center text-white">
          <span className="font-semibold text-xl tracking-tight">
            <a href="/">
              <img src={logo} alt="logo" className="h-32 w-full" />
            </a>
          </span>
        </div>
        {/* <!-- Hamburger Menu Mobile only --> */}
        <div className="py-12 bg-transparent">
          <span className="font-semibold text-xl md:hidden absolute left-10 top-0">
            <a href="/">
              <img src={logo} alt="logo" className="h-32 w-full" />
            </a>
          </span>
          <div
            className="absolute right-10 top-7 cursor-pointer md:hidden mt-5 text-gray-800"
            onClick={() => setOpen(!isopen)}
          >
            <FiMenu size={30} />
          </div>
        </div>

        {/* <!-- Nav Items --> */}
        <div
          className={
            isopen
              ? "fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
              : ""
          }
        >
          <button
            className={
              isopen
                ? "absolute top-0 right-0 m-2 text-white hover:text-gray-800 focus:text-gray-800 focus:outline-none"
                : "hidden"
            }
            onClick={closeMenu}
          >
            <svg className="h-12 w-12 fill-current">
              <IoCloseSharp />
            </svg>
          </button>
          <ul
            className={
              isopen
                ? ""
                : "hidden md:flex md:items-center md:ml-8 md:mx-0 md:pb-0 pb-12 absolute md:static bg-transparent md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in"
            }
          >
            {user ? (
              <>
                <li>
                  <a
                    href="/profile"
                    className=" md:text-gray-700 hover:text-blue-500 mr-2 md:text-base text-sm"
                  >
                    Edit Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full md:ml-4 md:text-base"
                  >
                    logout
                  </button>
                </li>
                <li>
                  <img
                    src={picture}
                    alt="avatarUrl"
                    className="h-8 w-8 rounded-full object-cover mx-8"
                  />
                </li>
              </>
            ) : (
              <>
                <></>
                <li className="md:ml-1 md:my-0 my-7">
                  <a
                    href="/"
                    className=" md:text-gray-700 hover:text-blue-500 mr-4 md:text-base text-sm"
                  >
                    Find a Tutor
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className=" md:text-gray-700 hover:text-blue-500 mr-4 md:text-base text-sm"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <button className="text-sm bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full md:ml-4 md:text-base">
                    <a href="/register">Sign Up</a>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
