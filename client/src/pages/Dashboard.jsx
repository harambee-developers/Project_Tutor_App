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
import Availability from "../components/profile/Availability";
import StarRating from "../components/features/StarRating";
import ProfilePictureModal from "../components/features/ProfilePictureModal";
import defaultProfilePic from "../assets/default_avatar.jpg";
import { useAuth } from "../components/features/AuthContext";
import ConfirmationDelete from "../components/features/ConfirmationDelete";
import { useNavigate } from "react-router-dom";
import favicon from "../../public/favicon.ico";
import { Helmet } from "react-helmet";

const Dashboard = () => {
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
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${
            authUser?.userId
          }`
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
        `${import.meta.env.VITE_BACKEND_URL}/api/user/users/delete/${
          authUser.userId
        }`
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

  const renderComponent = () => {
    switch (selectedTab) {
      case "Profile":
        return <MyProfile results={results} />;
      case "Review":
        return <Reviews />;
      case "Subjects":
        return isTutor ? (
          <Subjects initialSubjects={results.profile.subject} />
        ) : null;
      case "Availability":
        return isTutor ? <Availability /> : null;
      default:
        return null;
    }
  };

  const renderIcon = (option) => {
    switch (option) {
      case "Profile":
        return <FaUser className="inline mr-2" />;
      case "Review":
        return <FaStar className="inline mr-2" />;
      case "Subjects":
        return <FaBook className="inline mr-2" />;
      case "Availability":
        return <FaCalendar className="inline mr-2" />;
      case "Assignments":
        return <FaBook className="inline mr-2" />;
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

  const isTutor = results.usertype === "Tutor";
  const tabs = isTutor
    ? ["Profile", "Review", "Subjects", "Availability"]
    : ["Profile", "Review", "Assignments"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 lg:p-20">
      <Helmet>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        <title>Harambee Tutors | Edit Profile</title>
        <meta
          name="description"
          content="Edit your profile on Harambee Tutors to update your information and improve your tutoring services. Ensure your profile is up-to-date for better connections with students."
        />
        <meta
          name="keywords"
          content="Harambee Tutors, edit profile, update profile, tutoring services, tutor information, personalized tutoring"
        />
        <meta name="author" content="Harambee Tutors" />
        <meta property="og:title" content="Harambee Tutors | Edit Profile" />
        <meta
          property="og:description"
          content="Update your profile on Harambee Tutors to provide the most accurate and up-to-date information for your tutoring services."
        />
        <meta property="og:image" content={favicon} />
        <meta property="og:url" content={import.meta.env.VITE_BACKEND_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Harambee Tutors | Edit Profile" />
        <meta
          name="twitter:description"
          content="Edit your profile on Harambee Tutors to update your information and improve your tutoring services."
        />
        <meta name="twitter:image" content={favicon} />
      </Helmet>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden col-span-1 lg:col-span-3">
        <div className="p-4 flex justify-between items-center flex-wrap">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32">
              <img
                src={results.avatarUrl || defaultProfilePic}
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-0 left-0 bg-gray-800 bg-opacity-50 p-2 rounded-full text-white"
                aria-label="Edit picture"
              >
                <FaCamera className="h-6 w-6" />
              </button>
              <ProfilePictureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
            <div className="text-sm lg:text-base text-gray-700 font-semibold">
              {results.username}
              <div className="pt-2">
                <StarRating rating={results.profile.review.rating} />
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsModalDeleteOpen(true)}
            className="mt-4 lg:mt-0 bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-150 ease-in-out flex items-center justify-center"
            title="Delete Profile"
          >
            <FaTrash className="h-6 w-6" />
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
      <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden">
        <ul className="space-y-1">
          {tabs.map((option) => (
            <li key={option}>
              <button
                onClick={() => handleOnClick(option)}
                className={`w-full text-left font-semibold py-2 px-4 rounded transition duration-300 ease-in-out ${
                  selectedTab === option
                    ? "bg-teal-500 text-white"
                    : "hover:bg-teal-500 hover:text-white"
                }`}
              >
                {renderIcon(option)}
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden col-span-1 lg:col-span-2">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
