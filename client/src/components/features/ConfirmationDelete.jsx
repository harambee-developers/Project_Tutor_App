import React from 'react'

const ConfirmationDelete = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-700">Cancel</button>
            <button onClick={onConfirm} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Delete</button>
          </div>
        </div>
      </div>
    );
  };

export default ConfirmationDelete