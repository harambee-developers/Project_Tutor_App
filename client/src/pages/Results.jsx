import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Results = () => {
  const [results, setResults] = useState([]);

  const location = useLocation();

  // parse in the wuery parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    axios
      .get("http://localhost:7777/students")
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, [location.search]);

  const filteredData = results.filter((data) => {
    return data.email.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
    <p> There are {filteredData.length} results found</p>
      <table className="min-w-full divide-y divide-gray-200 table-auto hover:table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 marker:uppercase tracking-wide"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              USername
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
            >
              UserType
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-500">
          {filteredData.map((data) => (
            <tr key={data.id}>
              <td className="px-6 py-4 whitespace-nowrap">{data.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{data.usertype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Results;
