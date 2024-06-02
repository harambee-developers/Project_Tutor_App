import React from "react";

const CustomFooter = () => {
  return (
    <footer className="bg-gray-200 text-black py-5 bottom-0 w-full ">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 EDUFIRE All rights reservered</p>
        <div className="mt-4">
          <a href="/" className="text-gray-400 hover:text-white px-2">
            Terms of Service
          </a>
          <span className="text-gray-400">|</span>
          <a href="/" className="text-gray-400 hover:text-white px-2">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
