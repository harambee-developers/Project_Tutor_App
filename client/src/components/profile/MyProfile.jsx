import React, { useState } from "react";
import axios from "axios";

const MyProfile = ({ results }) => {
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
    try {
      const response = await axios.put(
        "http://localhost:7777/profile/661f46deaef4b520b8df50d4",
        data
      );
      console.log(data);
      console.log("Response:", response.data);
      console.log("Availability data saved successfully");
    } catch (error) {
      console.error("Error saving availability", error);
    } finally {
      setIssubmitting(false);
    }
  };

  return (
    <>
      <form className="space-y-4 min-h-screen" onSubmit={saveProfile}>
        <h1 className="font-semibold text-gray-700 text-xl">My Profile</h1>
        <div className="flex items-center text-gray-700">
          <label htmlFor="field1" className="w-1/3 px-2">
            Username:
          </label>
          <div className="w-1/2">
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
          <label htmlFor="field2" className="w-1/3 px-2">
            Email:
          </label>
          <div className="w-1/2">
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
          <label htmlFor="field3" className="w-1/3 px-2">
            Biography:
          </label>
          <div className="w-1/2">
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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default MyProfile;
