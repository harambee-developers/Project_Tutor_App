import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchAndFilter from "../components/features/SearchAndFilter";
import StarRating from "../components/features/StarRating";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import favicon from "../assets/harambee-logo.png"

const TutorProfile = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/tutors`
        );
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
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          href={favicon}
          sizes="16x16"
        />
        <title>Harambee Tutors | Tutor Search </title>
      </Helmet>
      <div className="flex flex-col md:flex-row">
        <select
          className="mb-4 md:mb-0 md:mr-4 mt-4 px-4 border-gray-400 rounded w-full md:w-auto py-2"
          id="Subjects"
          defaultValue=""
        >
          <option value="" disabled>
            All Subjects...
          </option>
        </select>
        <select
          className="mb-4 md:mb-0 md:mr-4 mt-4 px-4 border-gray-400 rounded w-full md:w-auto py-2"
          id="Levels"
          defaultValue=""
        >
          <option value="" disabled>
            All Levels...
          </option>
        </select>
        <SearchAndFilter
          data={tutors} // Assume tutors data is passed to the component
          setData={handleFilteredTutors}
        />
      </div>
      <h2 className="text-2xl font-bold mb-6 mt-10">Tutors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-row items-center"
          >
            <img
              src={tutor.avatarUrl}
              alt="Avatar"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mr-4"
            />
            <div className="text-left flex-grow">
              <div className="font-semibold">
                <Link to={`tutor/${tutor._id}`}>
                  <p> {tutor.username}</p>
                </Link>
              </div>
              <div className="mt-2">
                <StarRating rating={tutor.profile.review.rating} />
              </div>
              <div className="mt-2">
                <p>{tutor.headline}</p>
              </div>
              <div className="mt-2">
                <span className="font-semibold">Hourly Rate:</span> $
                {tutor.profile.hourlyRate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorProfile;
