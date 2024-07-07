import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const SuccessPayment = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/payment-success`, { sessionId })
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          console.error(error);
          setMessage('An error occurred. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setMessage('No session ID found.');
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4 sm:p-8 md:p-12 rounded-lg shadow-lg max-w-md mx-auto mt-10 mb-10">
      <section className="text-center">
        {loading ? (
          <p className="text-gray-800 font-semibold text-lg">Processing your payment...</p>
        ) : (
          <p className="text-gray-800 font-semibold text-lg">{message}</p>
        )}
        <p className="text-gray-800 font-semibold text-lg">
          We appreciate your business! If you have any questions, please email
          <a
            href="mailto:harambee_developers@hotmail.com"
            className="text-blue-500 hover:text-blue-700 underline pl-1"
          >
            harambee_developers@hotmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default SuccessPayment;
