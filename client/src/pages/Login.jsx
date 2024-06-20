import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../components/features/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import favicon from "../assets/harambee-logo.png"
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password, rememberMe);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/confirm");
      setUsername("");
      setPassword("");
    } catch (error) {
      toast.error("Login Failed", { position: "top-right" });
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen border">
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          href={favicon}
          sizes="16x16"
        />
        <title>Harambee Tutors | Login</title>
      </Helmet>
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl flex justify-center text-center font-semibold gap-2 mb-4">
          <FaUser />
          Login
        </h1>
        <div className="mt-3">
          <label htmlFor="username" className="block text-base mb-2">
            {" "}
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username..."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
            name="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500"
            required
          />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.click)}
            />
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
            className="border bg-teal-500 border-teal-700 text-white py-1 w-full rounded-md hover:bg-teal-700 font-semibold transition-all duration-300 ease-in-out"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
