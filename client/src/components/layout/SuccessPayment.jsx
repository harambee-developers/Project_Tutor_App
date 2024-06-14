import React from "react";
const SuccessPayment = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50 p-4 sm:p-8 md:p-12 rounded-lg shadow-lg max-w-md mx-auto mt-10 mb-10">
      <section className="text-center">
        {" "}
        {/* Center text alignment can be useful for single paragraphs like this. */}
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
