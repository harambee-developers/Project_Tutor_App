import React from 'react';

const AvailabilityTable = ({ availability }) => {
  const dayOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday"
  ];
  const timeSlots = [
    "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM",
    "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM",
    "6:00PM", "7:00PM", "8:00PM"
  ];

  const isTimeSlotSelected = (day, time) => {
    const dayAvailability = availability.find(avail => avail.day === day);
    return dayAvailability ? dayAvailability.times.includes(time) : false;
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-2 md:px-4 py-2 sticky top-0 bg-white border">Time</th>
            {dayOfWeek.map(day => (
              <th key={day} className="px-2 md:px-4 py-2 text-center sticky top-0 border">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time} className="bg-white">
              <td className="px-2 md:px-4 py-2 border">{time}</td>
              {dayOfWeek.map(day => (
                <td
                  key={`${day}-${time}`}
                  className={`px-2 md:px-4 py-2 text-center border ${
                    isTimeSlotSelected(day, time) ? 'bg-green-200' : 'bg-red-200'
                  }`}
                >
                  {isTimeSlotSelected(day, time) && <span>&#10003;</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailabilityTable;
