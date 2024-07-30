import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import axios from "axios";
import SearchAndFilter from "../components/features/SearchAndFilter";
import StarRating from "../components/features/StarRating";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import favicon from "../../public/favicon.ico";
import { curriculumLevels } from "../data/data";

const TutorProfile = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [priceRange, setPriceRange] = useState([10, 100]); // Assuming 0 to 100 as default range
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State for sidebar visibility
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false);
  const [selectedGender, setSelectedGender] = useState("default");
  const [selectedLevel, setSelectedLevel] = useState("default");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/tutors`
        );
        // Calculate min and max rates for each tutor
        const tutorsWithRates = response.data.map((tutor) => {
          if (tutor.profile?.subject?.length > 0) {
            const rates = tutor.profile.subject.map((subject) => subject.price);
            tutor.minRate = Math.min(...rates);
            tutor.maxRate = Math.max(...rates);
          } else {
            tutor.minRate = null;
            tutor.maxRate = null;
          }
          // Calculate the average rating
          if (tutor.profile?.review?.length > 0) {
            const totalRating = tutor.profile.review.reduce(
              (acc, reviews) => acc + reviews.rating,
              0
            );
            tutor.averageRating = (
              totalRating / tutor.profile.review.length
            ).toFixed(1);
          } else {
            tutor.averageRating = 0;
          }
          return tutor;
        });

        setTutors(tutorsWithRates);
        setFilteredTutors(tutorsWithRates); // Show all tutors by default
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    const filterTutors = () => {
      let filtered = tutors;

      // Price filter
      if (isPriceFilterActive) {
        filtered = filtered.filter((tutor) => {
          return tutor.profile.subject.some(
            (subject) =>
              subject.price >= priceRange[0] && subject.price <= priceRange[1]
          );
        });
      }

      // Gender filter
      if (selectedGender !== "default") {
        filtered = filtered.filter(
          (tutor) => tutor.gender === selectedGender
        );
      }

      // Level filter
      if (selectedLevel !== "default") {
        filtered = filtered.filter((tutor) =>
          tutor.profile.subject.some((subject) => subject.qualification === selectedLevel)
        );
      }

      setFilteredTutors(filtered);
    };

    filterTutors();
  }, [priceRange, selectedGender, selectedLevel, tutors, isPriceFilterActive]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <Helmet>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        <title>Harambee Tutors | Tutor Search </title>
        <meta
          name="description"
          content="Find the best tutors with Harambee Tutors. Search and connect with professional tutors for various subjects and levels."
        />
        <meta
          name="keywords"
          content="tutors, tutor search, find tutors, professional tutors, tutoring services, Harambee Tutors"
        />
        <meta name="author" content="Harambee Tutors" />
        <meta property="og:title" content="Harambee Tutors | Tutor Search" />
        <meta
          property="og:description"
          content="Search and connect with professional tutors for various subjects and levels at Harambee Tutors."
        />
        <meta property="og:image" content="URL_to_image" />
        <meta property="og:url" content={import.meta.env.VITE_BACKEND_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Harambee Tutors | Tutor Search" />
        <meta
          name="twitter:description"
          content="Search and connect with professional tutors for various subjects and levels at Harambee Tutors."
        />
        <meta name="twitter:image" content={favicon} />
      </Helmet>
      <h1 className="px-4 py-4 font-bold text-3xl">
        Find a private tutor that fits your schedule
      </h1>
      <p className="px-4 py-4 text-sm">
        Find your tutor and book a session to fit your schedule
      </p>
      <button
        className="font-semibold text-black hover:text-blue-500 flex items-center p-4 gap-2"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        Filters {isSidebarVisible ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <div className="flex flex-col md:flex-row">
        <div
          className={`md:w-1/4 p-4 ${isSidebarVisible ? "block" : "hidden"} `}
        >
          <div className="mb-8">
            <h5 className="font-bold text-sm mb-4 text-gray-500">
              Price Range
            </h5>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                £{priceRange[0]} - £{priceRange[1]}
              </span>
            </div>
            <Slider
              range
              min={10}
              max={100}
              step={10}
              defaultValue={[10, 100]}
              value={priceRange}
              onChange={(value) => {
                setPriceRange(value);
                setIsPriceFilterActive(true);
              }} // Activate price filter when slider is moved
              dotStyle={{ backgroundColor: "green", height: 10 }}
              activeDotStyle={{ backgroundColor: "white" }}
              trackStyle={{ backgroundColor: "green", height: 5 }}
              handleStyle={[
                {
                  borderColor: "green",
                  height: 20,
                  width: 20,
                  marginLeft: 5,
                  marginTop: -8,
                  backgroundColor: "white",
                },
                {
                  borderColor: "green",
                  height: 20,
                  width: 20,
                  marginLeft: 5,
                  marginRight: -5,
                  marginTop: -8,
                  backgroundColor: "white",
                },
              ]}
              railStyle={{ backgroundColor: "green", height: 5 }}
            />
          </div>
          <div className="mt-6">
            <h5 className="font-bold text-sm md:mb-4 mb-2 text-gray-500">
              Filter by Level
            </h5>
            <select
              name="level_filter"
              id="level_filter"
              className="py-2 px-4 mb-4 md:mb-0 border-gray-400 rounded w-full"
              defaultValue={"default"}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="default">
                All Levels
              </option>
              {curriculumLevels.map((level) => (
                <option key={level.id} value={level.name}>{level.name}</option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <h5 className="font-bold text-sm md:mb-4 mb-2 text-gray-500">
              Gender
            </h5>
            <select
              name="gender_filter"
              id="gender_filter"
              className="py-2 px-4 mb-4 md:mb-0 border-gray-400 rounded w-full"
              defaultValue={"default"}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="default">
                All genders
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>
        <div
          className={`w-full ${isSidebarVisible ? "md:w-3/4" : ""} md:p-6 px-4`}
        >
          <div className={`mb-6 ${isSidebarVisible ? "md:w-full" : "hidden"}`}>
            <SearchAndFilter
              data={tutors}
              setData={setFilteredTutors} // Assume tutors data is passed to the component
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition duration-500 ease-in-out mt-6 mb-4">
            {filteredTutors.map((tutor) => (
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
                    <StarRating rating={tutor.averageRating} />
                  </div>
                  <div className="mt-2">
                    <p>{tutor.headline}</p>
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold">Hourly Rate:</span>£
                    {tutor.minRate === tutor.maxRate
                      ? tutor.minRate
                      : `${tutor.minRate} - £${tutor.maxRate}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
