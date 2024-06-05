import React, { useState, useEffect } from "react";

const DaySelector = ({ availability, onAvailabilityChange }) => {
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

  // Initialize local state with the availability from props
  const [localAvailability, setLocalAvailability] = useState(availability || []);

  useEffect(() => {
    const completeAvailability = dayOfWeek.map(day => ({
      day,
      times: availability.find(avail => avail.day === day)?.times || []
    }));
  
    setLocalAvailability(completeAvailability);
  }, [availability]);

  const toggleTimeSlot = (day, time) => {
    const updatedAvailability = localAvailability.map((avail) => {
      if (avail.day === day) {
        const times = avail.times.includes(time)
          ? avail.times.filter((t) => t !== time) // Remove time if it's already included
          : [...avail.times, time]; // Add time if not included
        return { ...avail, times };
      }
      return avail;
    });

    setLocalAvailability(updatedAvailability);
    onAvailabilityChange(updatedAvailability);
  };

  const isTimeSlotSelected = (day, time) => {
    const dayData = localAvailability.find((d) => d.day === day);
    return dayData ? dayData.times.includes(time) : false;
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
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time} className="bg-white">
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
    </div>
  );
};

export default DaySelector;
