import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchAndFilter from "../components/features/SearchAndFilter";

const Results = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    axios
      .get("http://localhost:7777/students")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  const filteredData = data.filter((d) => {
    return d.email.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
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
          {filteredData.map((d) => (
            <tr key={d.id}>
              <td className="px-6 py-4 whitespace-nowrap">{d.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{d.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{d.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{d.usertype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Results;
