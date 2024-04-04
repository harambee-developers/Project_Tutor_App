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
  // Function for filtering the dataset fetched from api that is stored in the "data" state variable
  const filteredData = data.filter((d) => {
    return d.email.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <br />
      {/* <!-- SearchBar --> */}
      <div className="searchBar">
        <label for="input-group-search" className="sr-only">
          Search
        </label>
          <input
            placeholder="Search for tutors..."
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounde"
          >
            Search
          </button>
        {/* <!-- Dropdown menu --> */}
        <div className="dropdown-menu w-full md:w-2/3 lg">
          <div className="py-2 text-sm text-gray-700 dark:text-gray-200 h-20 overflow-auto">
            {query &&
              filteredData.map((item) => (
                <ul
                  key={item.id}
                  onClick={(e) => setQuery(item.email)}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  type="button"
                >
                  <li>{item.email}</li>
                </ul>
              ))}
          </div>
        </div>
        <br />
        <br />
        {/* <!-- Table --> */}
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
      </div>
    </div>
  );
};

export default SearchAndFilter;
