import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../features/AuthContext";
import { countriesData } from "../../data/Countries";

const MyProfile = ({ results }) => {
  const { user: authUser } = useAuth();
  const [data, setData] = useState(results);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    if (authUser) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/updateProfile/${
            authUser.userId
          }`,
          data
        );
        alert("Profile Data saved successfully");
      } catch (error) {
        console.error("Error saving profile data", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <form className="space-y-4 p-4" onSubmit={saveProfile}>
        <h1 className="font-semibold text-gray-700 text-xl p-4">My Profile</h1>

        {data.usertype === "Student" ? (
          <>
            {/* Student specific fields */}
            <div className="flex items-center text-gray-700">
              <label htmlFor="studentId" className="w-1/3 px-4">
                Student ID:
              </label>
              <div className="w-full px-4">
                <input
                  type="text"
                  name="studentId"
                  value={data._id}
                  className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
                  readOnly
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Tutor user fields */}
            <div className="flex items-center text-gray-700">
              <label htmlFor="headline" className="w-1/3 px-4">
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
              <label htmlFor="biography" className="w-1/3 px-4">
                Biography:
              </label>
              <div className="w-full px-4">
                <textarea
                  type="text"
                  name="bio"
                  value={data.profile.bio}
                  onChange={handleInputChange}
                  className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
                />
              </div>
            </div>
          </>
        )}

        {/* Common fields for all users */}
        <div className="flex items-center text-gray-700">
          <label htmlFor="username" className="w-1/3 px-4">
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
          <label htmlFor="username" className="w-1/3 px-4">
            First Name:
          </label>
          <div className="w-full px-4">
            <input
              type="text"
              name="firstname"
              value={data.firstname}
              onChange={handleInputChange}
              className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <label htmlFor="username" className="w-1/3 px-4">
            Last Name:
          </label>
          <div className="w-full px-4">
            <input
              type="text"
              name="lastname"
              value={data.lastname}
              onChange={handleInputChange}
              className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <label htmlFor="gender" className="w-1/3 px-4">
            Gender:
          </label>
          <div className="w-full px-4">
            <select
              type="text"
              name="gender"
              value={data.gender}
              onChange={handleInputChange}
              className="rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 w-full py-2 px-3 sm:text-sm"
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <label htmlFor="email" className="w-1/3 px-4">
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
          <label htmlFor="location" className="w-1/3 px-4">
            Location:
          </label>
          <div className="w-full px-4 relative">
            <select
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm rounded-md overflow-y-auto py-2 px-3"
              name="location"
              value={data.location}
              onChange={handleInputChange}
              size="1" // Ensures the dropdown opens downwards
              style={{ maxHeight: "150px" }} // Limits the height of the dropdown to show fewer options
              defaultValue={"default"}
            >
              <option value="default" disabled>
                Select location
              </option>
              {countriesData.map((item) => (
                <option key={item.code} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end m-4">
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700 transition-all duration-300 ease-in-out"
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
