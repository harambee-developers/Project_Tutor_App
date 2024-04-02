import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const SearchAndFilter = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch api data. Will use node api

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
    <div>
      <br />
      <div className="searchBar">
        <input
          placeholder="Type to search..."
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounde"
        >
          Search
        </button>
        {/* <!-- Dropdown menu --> */}
        <div className="dropdown-menu">
          <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {query &&
              filteredData.map((item) => (
                <div
                  key={item.id}
                  onClick={(e) => setQuery(item.email)}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  type='button'
                >
                  {item.email}
                </div>
              ))}
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default SearchAndFilter;
