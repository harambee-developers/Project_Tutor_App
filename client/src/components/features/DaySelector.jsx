import React, { useState, useEffect } from "react";

const DaySelector = ({ availability, onAvailabilityChange }) => {
  const dayOfWeek = [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
  ];
  const timeSlots = [
    "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM",
    "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM",
    "6:00PM", "7:00PM", "8:00PM"
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
          ? avail.times.filter((t) => t !== time)
          : [...avail.times, time];
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
    <div className="overflow-x-auto p-2">
      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-1 md:px-4 py-1 sticky top-0 bg-white">Time</th>
            {dayOfWeek.map((day) => (
              <th key={day} className="px-1 md:px-4 py-1 text-center sticky top-0">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time} className="bg-white">
              <td className="px-1 md:px-4 py-1">{time}</td>
              {dayOfWeek.map((day) => (
                <td
                  key={`${day}-${time}`}
                  className="px-1 md:px-4 py-1 text-center"
                >
                  <input
                    type="checkbox"
                    checked={isTimeSlotSelected(day, time)}
                    onChange={() => toggleTimeSlot(day, time)}
                    className="form-checkbox h-4 w-4 text-indigo-600"
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
