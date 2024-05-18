import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaStar, FaBook, FaCalendar, FaCamera } from "react-icons/fa";
import MyProfile from "../components/profile/MyProfile";
import Reviews from "../components/profile/Reviews";
import Subjects from "../components/profile/Subjects";
import Avaialbility from "../components/profile/Avaialbility";
import StarRating from "../components/features/StarRating";
import ProfilePictureModal from "../components/features/ProfilePictureModal";

const EditTutorProfilePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7777/user/661f46deaef4b520b8df50d4`
        );
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const renderComponent = () => {
    switch (selectedTab) {
      case "Profile":
        return <MyProfile results={results} />;
      case "Review":
        return <Reviews />;
      case "Subjects":
        return <Subjects />;
      case "Availability":
        return <Avaialbility />;
      default:
        return null
  };
}

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
      {/* <!-- Tutor Card --> */}
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden col-span-3">
        <div className="p-2 md:flex">
          <div className="relative w-32 h-32">
            <img
              src={results.avatarUrl}
              alt="image"
              className="h-full w-full object-cover rounded=full"
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
                  results={results}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="px-2 mt-5 uppercase tracking-wide text-sm text-gray-700 font-semibold mb-2">
              {results.username}
            </div>
            <div className="p-4 rounded-lg">
              {<StarRating rating={"3.5"} />}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Sidebar --> */}
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden md:col-span-1 col-span-3">
        <ul>
          <li>
            <button
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4
              ${selectedTab === "Profile" ? "bg-blue-500 text-white py-2 mb-4" : ""} `}
              onClick={() => handleOnClick("Profile")}
            >
              <FaUser />
              My Profile
            </button>
          </li>
          <li>
            <button
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4
              ${selectedTab === "Review" ? "bg-blue-500 text-white py-2 mb-4" : ""} `}
              onClick={() => handleOnClick("Review")}
            >
              <FaStar />
              Reviews
            </button>
          </li>
          <li>
            <button
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4
              ${selectedTab === "Subjects" ? "bg-blue-500 text-white py-2 mb-4" : ""} `}
              onClick={() => handleOnClick("Subjects")}
            >
              <FaBook />
              Subjects
            </button>
          </li>
          <li>
            <button
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4
              ${selectedTab === "Availability" ? "bg-blue-500 text-white py-2 mb-4" : ""} `}
              onClick={() => handleOnClick("Availability")}
            >
              <FaCalendar />
              Availability
            </button>
          </li>
        </ul>
      </div>
      {/* <!-- Render Component based on sidebar link --> */}
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden md:col-span-2 min-h-screen w-full">
        {renderComponent()}
      </div>
    </div>
  );
};

export default EditTutorProfilePage;
