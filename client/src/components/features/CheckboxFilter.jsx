import React, { useState } from "react";

const CheckboxFilter = ({ options, onFilterChange }) => {
  const [selectedFilters, setSelectedFilter] = useState([]);

  const handleCheckboxChange = (options) => {
    const updatedFilters = selectedFilters.includes(option)
      ? selectedFilters.filter((filter) => filter !== option)
      : [...selectedFilters, option];

    setSelectedFilter(updatedFilters);

    onFilterChange(updatedFilters);
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            value={option}
            checked={selectedFilters.includes(option)}
            onClick={e => handleCheckboxChange(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxFilter;
