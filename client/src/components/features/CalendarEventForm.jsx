import React, { useState } from "react";

const CalendarEventForm = ({ onSubmit }) => {
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ dayOfWeek, startTime, endTime });
    setDayOfWeek("Monday");
    setStartTime("");
    setEndTime("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <label>Start time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mx-2"
          required
        />
        <label>End time:</label>
        <input
          type="time"
          className="mx-2"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <button
          type="submit"
          className="py-2 px-2 rounded-full mx-2 text-sm bg-teal-500 hover:bg-blue-700 text-white "
        >
          Add Availability
        </button>
      </form>
    </div>
  );
};

export default CalendarEventForm;
