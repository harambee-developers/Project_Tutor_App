import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaStar, FaBook } from "react-icons/fa";
import MyProfile from "../components/profile/MyProfile";
import Reviews from "../components/profile/Reviews";
import Subjects from "../components/profile/Subjects";

const EditTutorProfilePage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Profile");

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

  const handleOnClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  const renderComponent = () => {
    if (selectedTab === "Profile") {
      return <MyProfile results={results} />;
    } else if (selectedTab === "Review") {
      return <Reviews />;
    } else {
      return <Subjects />;
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-10 p-20">
      {/* <!-- Tutor Card --> */}
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden col-span-3">
        <div className="p-2 md:flex">
          <img
            src={results.avatarUrl}
            alt="image"
            className="h-32 w-32 md:h-48 object-cover md:w-48"
          />
          <div className="">
            <div className="px-2 mt-5 uppercase tracking-wide text-sm text-gray-700 font-semibold mb-2">
              {results.username}
            </div>
            <div className="px-2 tracking-wide  text-sm text-gray-700 mb-2">
              Goal Oriented and Success guaranteed!
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Sidebar --> */}
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden col-span-1">
        <ul>
          <li>
            <button
              className={`w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4
          ${isButtonClicked ? "bg-blue-500 text-white py-2 mb-4" : ""} `}
              onClick={() => setSelectedTab("Profile")}
            >
              <FaUser />
              My Profile
            </button>
          </li>
          <li>
            <button
              className="w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4"
              onClick={() => setSelectedTab("Review")}
            >
              <FaStar />
              Reviews
            </button>
          </li>
          <li>
            <button
              className="w-full rounded flex justify-start text-center font-semibold gap-2 hover:bg-blue-500 hover:text-white hover:py-2 mb-4"
              onClick={() => setSelectedTab("Subjects")}
            >
              <FaBook />
              Subjects
            </button>
          </li>
        </ul>
      </div>
      {/* <!-- My Profile --> */}
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden col-span-2">
        <div>{renderComponent()}</div>
      </div>
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden col-span-3">
        <div className="flex justify-end">
          <button className="text-sm bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:ml-4 md:text-base">
            Cancel
          </button>
          <button className="text-sm bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded md:ml-4 md:text-base">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTutorProfilePage;
