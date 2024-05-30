import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaStar, FaBook, FaCalendar, FaCamera } from "react-icons/fa";
import MyProfile from "../components/profile/MyProfile";
import Reviews from "../components/profile/Reviews";
import Subjects from "../components/profile/Subjects";
import Availability from "../components/profile/Availability"; // Corrected spelling from 'Avaialbility'
import StarRating from "../components/features/StarRating";
import ProfilePictureModal from "../components/features/ProfilePictureModal";
import defaultProfilePic from "../assets/default_avatar.jpg"
import { useAuth } from "../components/features/AuthContext";

const EditTutorProfilePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user: authUser } = useAuth();

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

  const renderComponent = () => {
    switch (selectedTab) {
      case "Profile":
        return <MyProfile results={results} />;
      case "Review":
        return <Reviews />;
      case "Subjects":
        return <Subjects />;
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
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-20">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden col-span-3">
        <div className="p-2 md:flex">
          <div className="relative w-32 h-32">
            <img
              src={results.avatarUrl || {defaultProfilePic}}
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
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:col-span-1 col-span-3">
        <ul>
          <li>
            <button
              onClick={() => handleOnClick("Profile")}
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4 ${
                selectedTab === "Profile"
                  ? "bg-blue-500 text-white py-2 mb-4"
                  : ""
              }`}
            >
              {" "}
              <FaUser /> My Profile
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOnClick("Review")}
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4 ${
                selectedTab === "Review"
                  ? "bg-blue-500 text-white py-2 mb-4"
                  : ""
              }`}
            >
              {" "}
              <FaStar /> Reviews
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOnClick("Subjects")}
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4 ${
                selectedTab === "Subjects"
                  ? "bg-blue-500 text-white py-2 mb-4"
                  : ""
              }`}
            >
              {" "}
              <FaBook /> Subjects
            </button>
          </li>
          <li>
            <button
              onClick={() => handleOnClick("Availability")}
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4 ${
                selectedTab === "Availability"
                  ? "bg-blue-500 text-white py-2 mb-4"
                  : ""
              }`}
            >
              {" "}
              <FaCalendar /> Availability
            </button>
          </li>
        </ul>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:col-span-2 min-h-screen w-full">
        {renderComponent()}
      </div>
    </div>
  );
};

export default EditTutorProfilePage;
