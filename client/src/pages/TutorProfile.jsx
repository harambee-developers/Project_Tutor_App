import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchAndFilter from "../components/features/SearchAndFilter";
import StarRating from "../components/features/StarRating";

const TutorProfile = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:7777/api/user/tutors");
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

  const handleFilteredTutors = (filteredTutors) => {
    // Update tutors state based on filtered results
    setTutors(filteredTutors);
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <div className="flex">
        <select
          className="mr-4 mt-4 px-4 border-gray-400 rounded"
          id="Subjects"
        >
          <option value="" disabled selected>
            All Subjects...
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
          <option value="Maths">KCPE</option>
          <option value="Maths">KCSE</option>
          <option value="Science">College or Degree Equivalent</option>
        </select>
        <SearchAndFilter
          data={tutors} // Pass the tutors data to SearchAndFilter component
          setData={handleFilteredTutors}
        />
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
              <div className="font-semibold">
                <a href={`tutor/${tutor._id}`}> {tutor.username}</a>
              </div>
              <div className="mt-2">
                <StarRating rating={tutor.profile.review.rating} />
              </div>
              <div className="mt-2">
                <p>{tutor.headline}</p>
              </div>
              <div className="mt-2">
                <span className="font-semibold">Hourly Rate:</span> ${" "}
                {tutor.profile.hourlyRate}
              </div>
              <div className="mt-3">
                <button className="bg-green-500 hover:bg-green-600 text-xs text-white font-bold py-2 px-3 rounded">
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
