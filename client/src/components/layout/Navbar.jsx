import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import logo from "../../assets/harambee-logo-trans.png";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../features/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import io from "socket.io-client";
import MessageList from "../features/MessageList";

// Connect to the WebSocket server
const socket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const Navbar = () => {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // This function fetches the user profile data
    const fetchProfileInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/user/${authUser.userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch messages from the API
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/messages/${
            authUser.userId
          }`
        );
        setMessages(response.data); // Assuming the API returns an array of messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Check if authUser exists before making requests or setting up sockets
    if (authUser) {
      fetchProfileInfo(); // Fetch user profile information
      fetchMessages();

      // Socket operations
      socket.emit("joinRoom", "Student"); // Join a room using the userId

      // Listen for incoming messages
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      setUnreadCount((prevCount) => prevCount + 1); // Increment the unread messages count

      // Clean up the effect
      return () => {
        socket.off("message");
      };
    }
  }, [authUser, socket]); // Dependency array ensures this runs only if authUser changes

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    alert("You have successfully logged out");
    navigate("/login");
  };

  return (
    <nav className="shadow-md w-full top-0 bg-gray-200 md:px-20">
      <div className="flex items-center justify-between text-white md:px-10 px-7">
        <div className="font-bold">
          <Link to="/">
            <img src={logo} alt="logo" className="h-32 md:w-full" />
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          {authUser && (
            <button onClick={openModal} className="p-2 relative mr-2 cursor-pointer hover:text-black">
              <FaBell />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full transition duration-300 ease-in-out">
                  {unreadCount}
                </span>
              )}
            </button>
          )}
          <button
            className="p-2 text-gray-800 hover:text-white z-50"
            onClick={toggleMenu}
          >
            {isOpen ? <IoCloseSharp size={30} /> : <FiMenu size={30} />}
          </button>
        </div>
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } z-40 md:flex items-center fixed md:relative inset-0 md:inset-auto bg-black md:bg-transparent bg-opacity-80 md:bg-opacity-0 transition-all duration-500 ease-in-out md:w-auto w-full justify-center`}
        >
          <ul className="md:flex md:items-center md:space-x-4 space-y-4 md:space-y-0 text-base md:text-black text-white">
            {authUser ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="md:hidden hover:text-blue-500"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button onClick={openModal} className="hidden md:flex relative p-2 mr-2 cursor-pointer hover:text-white">
                    <FaBell />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full transition duration-300 ease-in-out">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="md:text-gray-700 hover:text-blue-500"
                    onClick={toggleMenu}
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 hover:border-1 text-white font-bold py-2 px-4 md:rounded-full transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <img
                    src={user?.avatarUrl}
                    alt="avatar"
                    className="hidden md:flex h-8 w-8 rounded-full object-cover"
                  />
                </li>
                <li>
                  <p className="hidden md:flex text-2xl">Hello!</p>
                  <p className="hidden md:contents">{user?.username}</p>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-500"
                    onClick={toggleMenu}
                  >
                    Find a Tutor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-blue-500"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 md:rounded-full transition duration-300 ease-in-out"
                    onClick={toggleMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Inbox"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
            overlayClassName="fixed inset-0 bg-black bg-opacity-80 z-50"
          >
            {/* Component or JSX to display messages */}
            <div className="p-4 max-w-xl w-full">
              <MessageList messages={messages} />
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
