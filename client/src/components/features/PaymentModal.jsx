import React from "react";
import Modal from "react-modal";

const PaymentModal = ({ isOpen, onRequestClose }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      maxWidth: '90%',
      width: '600px',
      maxHeight: '90%',
      overflow: 'auto',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000, // Ensure the modal is above other content
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Payment Modal"
      style={customStyles}
    >
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
        <form className="w-full grid gap-4">
          <div>
            <label className="block font-bold">First name</label>
            <input type="text" name="firstName" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-bold">Last name</label>
            <input type="text" name="lastName" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-bold">Card number</label>
            <input type="text" name="cardNumber" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-bold">Expiration date</label>
            <input type="text" name="expirationDate" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-bold">CVV/CVC</label>
            <input type="text" name="cvv" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-bold">Billing Address</label>
            <input type="text" name="billingAddress" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-bold">Country</label>
            <input type="text" name="country" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-bold">State/Province</label>
            <input type="text" name="state" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-bold">City</label>
            <input type="text" name="city" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-bold">Postal Code</label>
            <input type="text" name="postalCode" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded font-bold">Pay</button>
        </form>
        <button className="mt-4 w-full p-2 bg-teal-600 text-white rounded font-bold">
          Pay with Mpesa
        </button>
        <button className="mt-4 px-4 py-2 bg-gray-600 text-white rounded" onClick={onRequestClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PaymentModal;