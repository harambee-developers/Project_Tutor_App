import React, { useState } from "react";

const CheckboxFilter = ({ options, onFilterChange }) => {
  const [selectedFilters, setSelectedFilter] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (options) => {
    const updatedFilters = selectedFilters.includes(option)
      ? selectedFilters.filter((filter) => filter !== option)
      : [...selectedFilters, option];

    setSelectedFilter(updatedFilters);

    onFilterChange(updatedFilters);
  };

  return (
    <>
      <button
        onClick={toggleDropDown}
        className="py-2 px-4 bg-gray-200 rounded-md border border-gray-300 flex items-center justify-between"
      >
        Button{" "}
        <span className="ml-1">
          {selectedFilters.length > 0 && "(${selectedFilters.length})"}
        </span>
      </button>
      {isOpen &&
        options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              id={option}
              value={option}
              checked={selectedFilters.includes(option)}
              onClick={(e) => handleCheckboxChange(option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
    </>
  );
};

export default CheckboxFilter;
