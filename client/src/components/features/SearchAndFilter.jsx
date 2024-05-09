import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchAndFilter = ({ data, setData }) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterResults = () => {
      const filteredResults = data.filter((item) =>
        item.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filteredResults);
      setData(filteredResults); // Update parent component data with filtered results
      // Call filterResults function when query or data changes
    };
    filterResults();
  }, [query, data, setData]);

  const handleOnChange = (value) => {
    setQuery(value);
  };

  const handleDropdownItemClick = (username) => {
    setQuery(username);
  };

  return (
    <>
      <div
        className="w-full font-medium items-center justify-center md:mt-4"
        id="searchbar"
      >
        <div className="flex justify-center items-center md:ml-4">
          <div className="relative w-full mr-6">
            <input
              placeholder="Search..."
              type="search"
              value={query}
              onChange={(e) => handleOnChange(e.target.value)}
              className="w-full mt-2 md:mt-0 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch size={20} className="w-15 h-5 text-gray-400" />
            </div>
          </div>
        </div>
        {query && (
          <div className="absolute mt-1 w-1/2 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul className="py-2 text-sm text-gray-700 max-h-60 overflow-y-auto">
              {filteredData.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleDropdownItemClick(item.username)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-400 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item.username}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchAndFilter;
