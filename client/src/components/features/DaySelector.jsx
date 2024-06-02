import React, { useState } from "react";

const DaySelector = ({onAvailabilityChange}) => {
  const dayOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const timeSlots = [
    "8:00AM",
    "9:00AM",
    "10:00AM",
    "11:00AM",
    "12:00PM",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "4:00PM",
    "5:00PM",
    "6:00PM",
    "7:00PM",
    "8:00PM",
  ];
  const [availability, setAvailability] = useState({});

  const toggleTimeSlot = (day, time) => {
    const timesForDay = availability[day] || [];
    const updatedTimesForDay = timesForDay.includes(time)
        ? timesForDay.filter(t => t !== time) // Remove time if it's already in the array
        : [...timesForDay, time]; // Add time if it's not in the array

    const updatedAvailability = {
        ...availability,
        [day]: updatedTimesForDay,
    };
    setAvailability(updatedAvailability);
    //   logging availability state when a checkbox is checked. Allows me to view what the data would look like once it gets processed to the backend.
    onAvailabilityChange(updatedAvailability); // Update parent's state

    console.log("Availablity state: ", JSON.stringify(updatedAvailability));
  };

  const isTimeSlotSelected = (day, time) => {
    return availability[day] ? availability[day].includes(time) : false;
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-2 md:px-4 py-2 sticky top-0 bg-white">Time</th>
            {dayOfWeek.map((day) => (
              <th
                key={day}
                className="px-2 md:px-4 py-2 text-center sticky top-0"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-x-scroll">
          {timeSlots.map((time) => (
            <tr className="bg-white" key={time}>
              <td className="px-2 md:px-4 py-2">{time}</td>
              {dayOfWeek.map((day) => (
                <td
                  key={`${day}-${time}`}
                  className="px-2 md:px-4 py-2 text-center"
                >
                  <input
                    type="checkbox"
                    checked={isTimeSlotSelected(day, time)}
                    onChange={() => toggleTimeSlot(day, time)}
                    className="form-checkbox md:h-5 h-4 w-4 text-indigo-600"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-end mt-4">
      </div>
    </div>
  );
};

export default DaySelector;
