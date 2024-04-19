import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchAndFilter from "../components/features/SearchAndFilter";

const TutorProfile = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:7777/tutors");
        setTutors(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex">
        <select className="mr-4 mt-4 px-4 border-gray-400 rounded" id="Subjects">
          <option value="" disabled selected>
            Select a Subject...
          </option>
          <option value="English">English</option>
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
          <option value="ICT">ICT</option>
        </select>
        <select className="mr-4 mt-4 px-4 border-gray-400 rounded" id="Levels">
          <option value="" disabled selected>
            All Levels...
          </option>
          <option value="English">Primary</option>
          <option value="Maths">KS3</option>
          <option value="Maths">GCSE</option>
          <option value="Science">A-Level</option>
          <option value="Science">Degree</option>
        </select>
        <SearchAndFilter />
      </div>
      <h2 className="text-2xl font-bold mb-6 mt-10">Tutors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-lg shadow-md p-4 flex items-center"
          >
            <img
              src={tutor.avatarUrl}
              alt="Avatar"
              className="w-32 h-32 rounded-full mr-4"
            />
            <div>
              <div className="font-semibold"> {tutor.username}</div>
              <div className="mt-2">
                <span className="font-semibold">Bio:</span> {tutor.profile.bio}
              </div>
              <div className="mt-2">
                <span className="font-semibold">Hourly Rate:</span> ${" "}
                {tutor.profile.hourlyRate}
              </div>
              <div className="mt-3">
                <button class="bg-green-500 hover:bg-green-600 text-xs text-white font-bold py-2 px-3 rounded">
                  Availability
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorProfile;
