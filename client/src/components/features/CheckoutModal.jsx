import React, { useState } from 'react';

const CheckoutModal = ({ isOpen, onClose, subjects, availability, createCheckoutSession }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [hours, setHours] = useState(1);

  const handleSubmit = async () => {
    if (selectedSubject && selectedTime && hours > 0) {
      createCheckoutSession(selectedSubject, selectedTime, hours);
      onClose(); // Close modal after submission
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Book a Session</h2>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="block w-full p-2 border rounded mb-4">
          <option value="">Select Subject</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="block w-full p-2 border rounded mb-4">
          <option value="">Select Time</option>
          {availability.map(time => (
            <option key={time.id} value={time.id}>{time.label}</option>
          ))}
        </select>
        <input type="number" min="1" max="8" value={hours} onChange={(e) => setHours(e.target.value)} className="block w-full p-2 border rounded mb-4" />
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded w-full">Confirm Booking</button>
        <button onClick={onClose} className="mt-2 bg-red-500 text-white p-2 rounded w-full">Cancel</button>
      </div>
    </div>
  ) : null;
};

export default CheckoutModal;
