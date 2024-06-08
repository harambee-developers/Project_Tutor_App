import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "../components/features/StarRating";
import InitialsCircle from "../data/initialsCircle";
import ShowMoreText from "../components/features/ShowMoreText";
import AvailabilityTable from "../components/features/AvailabilityTable";

const TutorProfilePage = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState([]);

  const { userId } = useParams();
  
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7777/user/${userId}`
        );
        setResults(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7777/availability/${userId}`
        );
        const availabilityData = response.data[0].days
          ? response.data[0].days.map((dayInfo) => ({
              day: dayInfo.day,
              times: dayInfo.times,
            }))
          : [];
        console.log("Response: ", response.data[0].days);
        console.log("Data: ", availabilityData);
        setAvailability(availabilityData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTutorData();
    fetchAvailability();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  const hasReviews = results?.profile?.review?.rating;

  return (
    <div className="grid md:grid-cols-2 gap-10 p-20">
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
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
              <StarRating rating={results.profile.review.rating} />
            </div>
            <div className="px-2 tracking-wide  text-sm text-gray-700 mb-2">
              {results.headline}
            </div>
          </div>
        </div>
        <div className="px-2">
          <h1 className="px-2 font-semibold">About me</h1>
          <p className="text-gray-600 mb-2 px-2">
            <ShowMoreText text={results.profile.bio} limit={100} />
          </p>
        </div>
      </div>
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden px-4">
        <h1 className="font-semibold text:2xl items-center py-6">
          Contact {results.username}
        </h1>
        <div className="flex p-4 items-center">
          <p className="py-4 font-bold text-3xl">
            $ {results.profile.hourlyRate}
          </p>
          <p className="px-2">/ per hour</p>
        </div>
        <select className="w-full mt-4 mb-4 text-black px-4 py-2" id="Levels">
          <option value="" disabled selected>
            Select subject and levels
          </option>
          <option value="English">Primary</option>
          <option value="Maths">KCPE</option>
          <option value="Maths">KCSE</option>
          <option value="Science">College or Degree Equivalent</option>
        </select>
        <button className="w-full mr-8 mt-4 mb-4 bg-teal-500 hover:bg-blue-600 text-white py-2 rounded-full">
          Book Now
        </button>
        <button className="w-full mr-8 mt-4 mb-4 hover:bg-blue-600 hover:text-white text-black py-2 rounded-full">
          Send Message
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:col-span-2">
        <h1 className="font-semibold text-xl p-4">Ratings and Reviews</h1>
        {hasReviews ? (
          <div>
            <span className="text-8xl px-4">
              {results.profile.review.rating}
            </span>
            <div className="p-4 rounded-lg">
              <StarRating rating={results.profile.review.rating} />
            </div>
            <hr className="mb-5" />
            <div className="flex mb-5 px-5">
              <InitialsCircle
                name={results.profile.review.name}
                size={50}
                backgroundColor="bg-red-500"
                textColor="text-white"
              />
              <div className="ml-5">
                <h1 className="font-semibold text-xl px-4">
                  {results.profile.review.name}
                </h1>
                <p className="p-4">{results.profile.review.description}</p>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            No reviews listed.
          </div>
        )}
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:col-span-2 px-4">
        <h1 className="font-semibold text-xl py-4">Subjects Offered</h1>
        {results.profile?.subject?.length > 0 ? (
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Qualification
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {results.profile.subject.map((subject, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {subject.subject}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {subject.qualification}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${subject.price}/hr
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-5 border-b border-gray-200 bg-white text-sm">
            No subjects listed.
          </div>
        )}
      </div>
      <div className=" bg-white shadow-lg rounded-lg overflow-hidden md:col-span-2">
        <h1 className="font-semibold text-xl items-center p-4">Availability</h1>
        <AvailabilityTable availability={availability} />{" "}
        {/* Render AvailabilityTable component */}
      </div>
    </div>
  );
};

export default TutorProfilePage;
