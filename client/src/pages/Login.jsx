import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../components/features/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [pword, setpword] = useState("");

  const handleLogin = async () => {
    try {
      await login(uname, pword);
      toast.success('Login successful!', { position: "top-center" });
      navigate('/confirm')
      setUname("");
      setpword("");
    } catch (error) {
      toast.error('Login Failed', { position: "top-center" });
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen border">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl flex justify-center text-center font-semibold gap-2 mb-4">
          <FaUser />
          Login
        </h1>
        <hr className="mt-3" />
        <div className="mt-3">
          <label htmlFor="username" className="block text-base mb-2">
            {" "}
            Username
          </label>
          <input
            type="text"
            placeholder="Enter Username..."
            onChange={(e) => setUname(e.target.value)}
            value={uname}
            id="username"
            className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="password" className="block text-base mb-2">
            {" "}
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password..."
            onChange={(e) => setpword(e.target.value)}
            value={pword}
            id="password"
            className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500"
            required
          />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div>
            <input type="checkbox" />
            <label htmlFor="">Remember Me?</label>
          </div>
          <div>
            <a
              href="/"
              className="text-teal-500 font-semibold hover:bg-blue-300"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={handleLogin}
            className="border-2 bg-teal-500 border-teal-700 text-white py-1 w-full rounded-md hover-bg-transparent hover:text-teal-500 font-semibold"
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
