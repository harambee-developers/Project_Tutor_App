import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ResultsCard from "./ResultsCard";

const Results = () => {
  const [results, setResults] = useState([]);

  const location = useLocation();

  // parse in the query parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    axios
      .get("http://localhost:7777/tutors")
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, [location.search]);

  const filteredData = results.filter((data) => {
    return data.email.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <h1 className="ml-4 mb-4 font-semibold text-3xl">Your Search Results</h1>
      <p className="ml-4"> There are {filteredData.length} results found!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((data) => (
          <ResultsCard
            key={data.id}
            user_id={data.id}
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
