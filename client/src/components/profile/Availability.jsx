import React, {useState} from 'react';
import DaySelector from '../features/DaySelector';
import axios from "axios";
import { useAuth } from '../features/AuthContext';

const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const { user } = useAuth();  
  
  const handleDaySelection = (day, isSelected) => {
    if (isSelected) {
      setAvailability([...availability, day]);
    } else {
      setAvailability(availability.filter(d => d !== day));
    }
  };

  const saveAvailability = async () => {
    try {
      const response = await axios.post(
        `http://localhost:7777/availability/${user.userId}`, availability
      );
      console.log("Data:", availability);
      alert("Availability data saved successfully");
      console.log("Availability data saved successfully");
    } catch (error) {
      console.error("Error saving availability", error);
    }
  };

  return (
    <div className='min-h-screen'>
      <h1 className='font-semibold text-xl mb-4 p-4'>Set your Availability</h1>
      <DaySelector onSelectDay={handleDaySelection}/>
      <div className="flex justify-end p-4">
        <button
            onClick={saveAvailability}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Availability
          </button>
      </div>
    </div>
  )
}

export default Availability;
