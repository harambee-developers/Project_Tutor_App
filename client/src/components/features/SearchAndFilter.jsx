import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const SearchAndFilter = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("")

  // Fetch api data. Will use node api

  useEffect(() => {
    axios
      .get("http://localhost:7777/students")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    console.log(data);
  }, []);

  // const filteredData = (e) => (query.filter((data) => {
  //   return data.id.toLowerCase().includes(query.toLowerCase())
  // });

  // const handleCheck = (e) => {
  //   setQuery(
  //     query.filter((data) => data.id.toLowerCase().includes(e.toLowerCase()))
  //   );
  // };

  return (
    <div>
      <h1 className="text-center">Tutor Results</h1>
      <br />
      <input
        placeholder="Type to search..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      />
      <br />
      <br />
      <table className="min-w-full divide-y divide-gray-200">
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
          {data.map((d) => (
            <tr key={d.id}>
              <td className="px-6 py-4 whitespace-nowrap">{d.Cid}</td>
              <td className="px-6 py-4 whitespace-nowrap">{d.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{d.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{d.usertype}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchAndFilter;
