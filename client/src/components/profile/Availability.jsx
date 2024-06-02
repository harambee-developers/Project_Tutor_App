import React, { useState } from "react";
import DaySelector from "../features/DaySelector";
import axios from "axios";
import { useAuth } from "../features/AuthContext";

const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAvailabilityChange = (newAvailability) => {
    setAvailability(newAvailability);
  };

  const saveAvailability = async () => {
    console.log("data is: ", availability);
    setIsLoading(true); // Start loading
    try {
      const response = await axios.put(
        `http://localhost:7777/availability/${user.userId}`,
        { days: availability }
      );
      console.log("Data:", response.data);
      alert("Availability data saved successfully");
      console.log("Availability data saved successfully");
    } catch (error) {
      console.error("Error saving availability", error);
    }
    setIsLoading(false); // Start loading
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="font-semibold text-xl mb-4 p-4">Set your Availability</h1>
      <DaySelector onAvailabilityChange={handleAvailabilityChange} />
      <div className="flex justify-end p-4">
        <button
          onClick={saveAvailability}
          className={`px-4 py-2 text-white rounded ${
            isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          Save Availability
        </button>
      </div>
    </div>
  );
};

export default Availability;
