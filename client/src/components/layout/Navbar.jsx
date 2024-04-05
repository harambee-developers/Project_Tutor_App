import React, { useState } from "react";
import { DiFsharp } from "react-icons/di";
import { FiMenu } from "react-icons/fi";
import SearchAndFilter from "../features/SearchAndFilter";

const Navbar = () => {
  const [isopen, setOpen] = useState(false);

  return (
    <nav className="shadow:md w-full sticky top-0 bg-teal-500 py-6">
      {/* <!-- Logo and SearchBar placement --> */}
      <div className="md:flex items-center justify-between text-white mr-6 text-xl md:px-10 px-7">
        <div className="font-bold flex items-center text-white">
          <span className="font-semibold text-xl tracking-tight">
            <DiFsharp size={50} />
          </span>
          Harambee DevOps
        </div>
        <SearchAndFilter />
        {/* <!-- Hamburger Menu Mobile only --> */}
        <div
          className="absolute right-8 top-6 cursor-pointer md:hidden"
          onClick={() => setOpen(!isopen)}
        >
          <FiMenu size={30} name={isopen ? "showMenuNav" : "hideMenuNav"} />
        </div>

        {/* <!-- Nav Items --> */}
        <ul
          className={
            isopen
              ? "md:flex md:items-center md:ml-8 md:mx-0 md:pb-0 pb-12 absolute md:static bg-teal-500 md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in"
              : "hidden md:flex md:items-center md:ml-8 md:mx-0 md:pb-0 pb-12 absolute md:static bg-teal-500 md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in"
          }
        >
          <li className="md:ml-1 md:my-0 my-7">
            <a href="/" className="text-white hover:text-blue-500 mr-4">
              Home
            </a>
          </li>
          <li className="md:ml-1 md:my-0 my-7">
            <a href="/about" className="text-white hover:text-blue-500 mr-4">
              About
            </a>
          </li>
          <li className="md:ml-1 md:my-0 my-7">
            <a
              href="/tutorprofile"
              className=" text-white hover:text-blue-500 mr-4"
            >
              Profiles
            </a>
          </li>
          <li className="md:my-0 my-7">
            <button className="bg-transparent hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full md:ml-8">
              <a href="/login">Login</a>
            </button>
          </li>
          <li className="md:my-0 my-7">
            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full md:ml-8">
              <a href="/register">Sign Up</a>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
