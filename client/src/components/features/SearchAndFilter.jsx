import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Results from "../../pages/Results";

const SearchAndFilter = () => {
  // data fetched from api stored in state variable
  const [data, setData] = useState([]);

  // query values stored in state variable
  const [query, setQuery] = useState("");

  let navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?query=${query}`);
  };

  const handleOnChange = (value) => {
    // Fetch api data. Will use node api
    axios
      .get("http://localhost:7777/students")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    setQuery(value);
  };

  // Function for filtering the dataset fetched from api that is stored in the "data" state variable
  const filteredData = data.filter((d) => {
    return d.email.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      {/* <!-- SearchBar --> */}
      <div
        className="md:w-1/2 font-medium items-center justify-center mt-6 md:mt-4"
        id="searchbar"
      >
        <div className="flex justify-center items-center md:ml-4">
          <div className="relative w-full">
            <input
              id="search-btn"
              placeholder="Search"
              type="search"
              value={query}
              onChange={(e) => handleOnChange(e.target.value)}
              className="w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch size={20} className="w-15 h-5 text-gray-400" />
            </div>
          </div>
          <button
            id="submit-btn"
            onClick={handleOnSubmit}
            type="submit"
            className="bg-black hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-2 border-blue-700 hover:border-blue-500 rounded-full"
          >
            Search
          </button>
        </div>
        {/* <!-- Dropdown menu --> */}
        <div
          className="flex justify-center items-center absolute bg-white"
          id="dropdown menu"
        >
          <ul className="ml:2 py-2 text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-y-auto w-full">
            {query &&
              filteredData.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setQuery(item.email)}
                  className="px-4 py-2 w-full hover:bg-blue-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  type="button"
                >
                  {item.email}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilter;
