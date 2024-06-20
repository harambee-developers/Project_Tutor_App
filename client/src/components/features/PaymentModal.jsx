import { React, useState, useEffect } from "react";
import Modal from "react-modal";
import stripe_logo from "../../assets/stripe_logo.png";
import mpesa_logo from "../../assets/mpesa_logo.png";

const PaymentModal = ({
  isOpen,
  onRequestClose,
  createCheckoutSession,
  subjects,
  availability,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "90%",
      width: "600px",
      maxHeight: "90%",
      overflow: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000, // Ensure the modal is above other content
    },
  };

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [hours, setHours] = useState(1);
  // Add the maxHours state initialization at the start of your component
  const [maxHours, setMaxHours] = useState(1);

  const calculateAvailableHours = () => {
    if (!selectedDay || !selectedTime) {
      return 1; // Default value when no day or time is selected
    }

    const daySchedule = availability.find((day) => day.day === selectedDay);
    if (!daySchedule) {
      return 1;
    }

    const startTimeIndex = daySchedule.times.findIndex(
      (time) => time === selectedTime
    );
    return daySchedule.times.length - startTimeIndex; // Remaining slots in the day
  };

  // Update your useEffect dependency array and logic as shown earlier
  useEffect(() => {
    const maxHours = calculateAvailableHours();
    if (hours > maxHours) {
      setHours(maxHours);
    }
    setMaxHours(maxHours); // Assuming you have a state [maxHours, setMaxHours] for this
  }, [selectedDay, selectedTime, availability]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Payment Modal"
      style={customStyles}
    >
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Booking Checkout</h2>
        <form className="w-full grid gap-4">
          <div>
            <label className="block font-bold">First name</label>
            <input
              type="text"
              name="firstName"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Last name</label>
            <input
              type="text"
              name="lastName"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Email</label>
            <input
              type="text"
              name="email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.subject} - {subject.qualification}
              </option>
            ))}
          </select>
          <select
            value={selectedDay}
            onChange={(e) => {
              setSelectedDay(e.target.value);
              setSelectedTime(""); // Reset time when day changes
            }}
            className="block w-full p-2 border rounded mb-4"
          >
            <option value="">Select Day</option>
            {availability.map((day) => (
              <option key={day.day} value={day.day}>
                {day.day}
              </option>
            ))}
          </select>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          >
            <option value="">Select Time</option>
            {selectedDay &&
              availability
                .find((day) => day.day === selectedDay)
                ?.times.map((time, index) => (
                  <option key={`${selectedDay}-${index}`} value={time}>
                    {time}
                  </option>
                ))}
          </select>
          <label className="block font-bold">Set Hours</label>
          <input
            type="number"
            min="1"
            max={maxHours}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="block w-full p-2 border rounded mb-4"
          />
          <button
            type="button"
            className="w-full flex justify-center items-center p-2 bg-green-500 text-white rounded font-bold hover:bg-transparent hover:text-teal-500 hover:border-2 transition duration-300 ease-in-out"
            onClick={createCheckoutSession}
          >
            Pay with
            <img src={stripe_logo} alt="Stripe" className="ml-2 h-10" />
          </button>
        </form>
        <button className="mt-4 w-full p-2 flex justify-center items-center bg-teal-600 text-white rounded font-bold hover:bg-transparent hover:text-teal-500 hover:border-2 transition duration-300 ease-in-out">
          Pay with
          <img src={mpesa_logo} alt="Mpesa" className="ml-2 h-10" />
        </button>
        <button
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
