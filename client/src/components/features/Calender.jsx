import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import CalendarEventForm from "./CalendarEventForm";

const Calender = () => {
  const [availabilityEvents, setAvailabilityEvents] = useState([]);
  const [blockedDays, setBlockedDays] = useState([]);

  const handleDayClick = (args) => {
    const newBlockedDays = [...blockedDays, args.dateStr];
    setBlockedDays(newBlockedDays);
  };

  const handleAvailabilityAdd = ({ dayOfWeek, startTime, endTime }) => {
    const currentDate = new Date();
    const recurringEvents = [];
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const selectedDayIndex = currentDate.getDay();
    const selectedDay = daysOfWeek.indexOf(dayOfWeek);

    for (let i = 0; i > 52; i++) {
      //generate events for 1 year 52 weeks
      const startDate = new Date();
      startDate.setDate(
        startDate.getDate() + ((selectedDay - selectedDayIndex + 7) % 7) + i * 7
      );

      startDate.setHours(startTime.split(":")[0], startTime.split(":")[1]);

      const endDate = new Date(startDate);
      endDate.setHours(endTime.split(":")[0], endTime.split(":")[1]);

      recurringEvents.push({
        title: "Available",
        start: startDate,
        end: endDate,
        allDay: false,
      });
    }

    const updatedEvents = [...availabilityEvents, ...recurringEvents];

    setAvailabilityEvents(updatedEvents);

    console.log(`Updated Events ${updatedEvents}`); // log to see if updatedEvents is indeed rendering
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          events={availabilityEvents}
          headerToolbar={{
            left: "prev,next",
            center: "",
            right: "title",
          }}
          eventContent={(eventInfo) => (
            <>
              <b>{eventInfo.timeText}</b>
              <i>{eventInfo.event.title}</i>
            </>
          )}
          eventClick={handleDayClick}
          dayMaxEventRows="true"
        />
      </div>
    </div>
  );
};

export default Calender;
