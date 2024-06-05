import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../features/AuthContext";

const MyProfile = ({ results }) => {
  const { user:authUser } = useAuth();
  const [data, setData] = useState(results);
  const [isSubmitting, setIssubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        [name]: value,
      },
      [name]: value,
    }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIssubmitting(true);
    if (authUser) {
      try {
        const response = await axios.put(
          `http://localhost:7777/profile/${authUser.userId}`,
          data
        );
        console.log(data);
        console.log("Response:", response.data);
        alert("Profile Data saved successfully")
        console.log("Profile data saved successfully");
      } catch (error) {
        console.error("Error saving availability", error);
      } finally {
        setIssubmitting(false);
      }
    }
  };

  return (
    <>
      <form className="space-y-4 p-4" onSubmit={saveProfile}>
        <h1 className="font-semibold text-gray-700 text-xl p-4">My Profile</h1>
        <div className="flex items-center text-gray-700">
          <label htmlFor="field1" className="w-1/3 px-4">
            Username:
          </label>
          <div className="w-full px-4">
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleInputChange}
              className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <label htmlFor="field2" className="w-1/3 px-4">
            Headline:
          </label>
          <div className="w-full px-4">
            <input
              type="text"
              name="headline"
              value={data.headline}
              onChange={handleInputChange}
              className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <label htmlFor="field3" className="w-1/3 px-4">
            Email:
          </label>
          <div className="w-full px-4">
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <label htmlFor="field4" className="w-1/3 px-4">
            Biography:
          </label>
          <div className="w-full px-4">
            <textarea
              type="text"
              name="bio"
              value={data.profile.bio}
              onChange={handleInputChange}
              className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
              rows="5"
            />
          </div>
        </div>
        <div className="flex items-center justify-end m-4">
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-blue-600"
            disabled={isSubmitting} // Disable button while loading
            >
          {isSubmitting ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default MyProfile;
