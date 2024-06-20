import React from 'react';

const SignUpModal = ({ isOpen, onClose, onSignUp }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center p-4 z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Sign Up Required</h2>
        <p>You need to be signed in as a student to book sessions.</p>
        <div className="mt-4 flex justify-end space-x-3">
          <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 w-full rounded-md transition duration-300 ease-in-out">Close</button>
          <button onClick={onSignUp} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 w-full rounded-md transition duration-300 ease-in-out">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;