import React, { useState, useEffect } from "react";
import DaySelector from "../features/DaySelector";
import axios from "axios";
import { useAuth } from "../features/AuthContext";

const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:7777/availability/${user.userId}`);
        // Ensure data is in the expected format, e.g., [{day: "Monday", times: ["8:00AM", "9:00AM"]}]
        setAvailability(response.data[0].days || []);
      } catch (error) {
        console.error("Error fetching availability data:", error);
      }
    };
  
    fetchData();
  }, [user.userId]);

  const handleAvailabilityChange = (newAvailability) => {
    setAvailability(newAvailability);
  };

  const saveAvailability = async () => {
    const validDays = availability.filter(
      (day) => day.day && day.times.length > 0
    );
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:7777/availability/${user.userId}`,
        { days: validDays }
      );
      console.log("Data:", response.data);
      alert("Availability data saved successfully");
    } catch (error) {
      console.error("Error saving availability", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="font-semibold text-xl mb-4 p-4">Set your Availability</h1>
      <DaySelector
        onAvailabilityChange={handleAvailabilityChange}
        availability={availability}
      />
      <div className="flex justify-end p-4">
        <button
          onClick={saveAvailability}
          className={`px-4 py-2 text-white rounded ${
            isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Availability;
