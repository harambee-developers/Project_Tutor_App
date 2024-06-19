import React, { useState, useEffect } from "react";
import DaySelector from "../features/DaySelector";
import axios from "axios";
import { useAuth } from "../features/AuthContext";

const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true while fetching
      setError(""); // Reset error message before new API call
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/availability/${user.userId}`);
        // Ensure data is in the expected format, e.g., [{day: "Monday", times: ["8:00AM", "9:00AM"]}]
        const fetchedAvailability = response.data?.[0]?.days ?? [];
        setAvailability(fetchedAvailability);
      } catch (error) {
        console.error("Error fetching availability data:", error);
        setError("Failed to fetch availability data. Please try again."); // Set error message on catch
      } finally {
        setIsLoading(false); // Ensure loading is set to false after fetching
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
        `${import.meta.env.VITE_BACKEND_URL}/api/user/availability/${user.userId}`,
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
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
      <DaySelector
        onAvailabilityChange={handleAvailabilityChange}
        availability={availability}
      />
      <div className="flex justify-end p-4">
        <button
          onClick={saveAvailability}
          className={`px-4 py-2  text-white rounded transition-all duration-300 ease-in-out ${
            isLoading ? "bg-gray-500" : "bg-teal-500 hover:bg-teal-700"
          }`}
          disabled={isLoading}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Availability;
