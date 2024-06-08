import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaStar,
  FaBook,
  FaCalendar,
  FaCamera,
  FaTrash,
} from "react-icons/fa";
import MyProfile from "../components/profile/MyProfile";
import Reviews from "../components/profile/Reviews";
import Subjects from "../components/profile/Subjects";
import Availability from "../components/profile/Availability"; // Corrected spelling from 'Avaialbility'
import StarRating from "../components/features/StarRating";
import ProfilePictureModal from "../components/features/ProfilePictureModal";
import defaultProfilePic from "../assets/default_avatar.jpg";
import { useAuth } from "../components/features/AuthContext";
import ConfirmationDelete from "../components/features/ConfirmationDelete";
import { useNavigate } from "react-router-dom";

const EditTutorProfilePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutorProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:7777/user/${authUser?.userId}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      fetchTutorProfile();
    }
  }, [authUser]);

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(
        `http://localhost:7777/users/delete/${authUser.userId}`
      );
      alert("Profile deleted successfully");
      // Redirect to another page and log out the user
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting profile:", error);
      setError("Failed to delete profile");
    }
  };

  const curriculumLevels = [
    { id: 1, name: "GCSE" },
    { id: 2, name: "A-Level" },
    { id: 3, name: "IB" },
    { id: 4, name: "Undergraduate" },
    { id: 5, name: "Postgraduate" },
  ];

  const renderComponent = () => {
    switch (selectedTab) {
      case "Profile":
        return <MyProfile results={results} />;
      case "Review":
        return <Reviews />;
      case "Subjects":
        return <Subjects initialSubjects={results.profile.subject} />;
      case "Availability":
        return <Availability />;
      default:
        return null;
    }
  };

  const handleOnClick = (value) => {
    setSelectedTab(value);
  };

  if (loading) {
    return <div className="text-center mt-8 min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-20">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden col-span-3">
        <div className="p-2 md:flex justify-between items-center">
          <div className="flex items-center">
            {" "}
            {/* Container for the image and camera icon */}
            <div className="relative w-32 h-32">
              <img
                src={results.avatarUrl || { defaultProfilePic }}
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />
              <div className="absolute bottom-2 left-2">
                <div className="bg-gray-800 bg-opacity-50 p-2 rounded-full">
                  <FaCamera
                    className="h-6 w-6 text-white"
                    onClick={() => setIsModalOpen(true)}
                  />
                  <ProfilePictureModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
                </div>
              </div>
            </div>
            <div className="px-2 mt-5 uppercase tracking-wide text-sm text-gray-700 font-semibold mb-2">
              {results.username}
              <div className="py-4 rounded-lg">
                <StarRating rating={results.profile.review.rating} />
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsModalDeleteOpen(true)}
            className="ml-auto bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-150 ease-in-out"
            title="Delete Profile"
          >
            <FaTrash className="h-6 w-6" /> {/* FontAwesome Trash Icon */}
          </button>
          <ConfirmationDelete
            isOpen={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(false)}
            onConfirm={() => {
              handleDeleteProfile();
              setIsModalDeleteOpen(false);
            }}
          />
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:col-span-1 col-span-3">
        <ul>
          <li>
            <button
              onClick={() => handleOnClick("Profile")}
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-teal-500 hover:text-white hover:py-2 mb-4 ${
                selectedTab === "Profile"
                  ? "bg-teal-500 text-white py-2 mb-4"
                  : ""
              }`}
            >
              <div className="flex space-x-2">
                <div className="px-2 py-1">
                  <FaUser />
                </div>
                <p>My Profile</p>
              </div>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOnClick("Review")}
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-teal-500 hover:text-white hover:py-2 mb-4 ${
                selectedTab === "Review"
                  ? "bg-teal-500 text-white py-2 mb-4"
                  : ""
              }`}
            >
              {" "}
              <div className="flex space-x-2">
                <div className="px-2 py-1">
                  <FaStar />
                </div>
                <p>Reviews</p>
              </div>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOnClick("Subjects")}
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-teal-500 hover:text-white hover:py-2 mb-4 ${
                selectedTab === "Subjects"
                  ? "bg-teal-500 text-white py-2 mb-4"
                  : ""
              }`}
            >
              {" "}
              <div className="flex space-x-2">
                <div className="px-2 py-1">
                  <FaBook />
                </div>
                <p>Subjects</p>
              </div>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOnClick("Availability")}
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-teal-500 hover:text-white hover:py-2 mb-4 ${
                selectedTab === "Availability"
                  ? "bg-teal-500 text-white py-2 mb-4"
                  : ""
              }`}
            >
              {" "}
              <div className="flex space-x-2">
                <div className="px-2 py-1">
                  <FaCalendar />
                </div>
                <p>Availability</p>
              </div>
            </button>
          </li>
        </ul>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:col-span-2 col-span-3 min-h-screen w-full">
        {renderComponent()}
      </div>
    </div>
  );
};

export default EditTutorProfilePage;
