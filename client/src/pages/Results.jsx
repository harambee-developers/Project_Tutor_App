import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ResultsCard from "./ResultsCard";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // parse in the query parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:7777/tutors");
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTutors();
  }, [location.search]);

  const filteredData = results.filter((data) => {
    return data.email.toLowerCase().includes(query.toLowerCase());
  });

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <>
      <h1 className="ml-4 mb-4 font-semibold text-3xl">Your Search Results</h1>
      <p className="ml-4"> There are {filteredData.length} results found!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((data) => (
          <ResultsCard
            key={data._id}
            user_id={data._id}
            avatarsrc={data.avatarUrl}
            name={data.username}
            email={data.email}
            bio={data.profile.bio}
            rate={data.profile.hourlyRate}
          />
        ))}
      </div>
    </>
  );
};

export default Results;

