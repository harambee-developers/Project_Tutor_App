import React from "react";

const ProfilePage = ({ avatarUrl, name, email, bio, rate }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadows-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={avatarUrl}
            alt="avatarUrl"
          />
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {name}
            </div>
            <p className="text-gray-700">
              Subjects Specialized in: Maths, Physics, ICT
            </p>
            <p className="text-gray-700">
              Education: Bachelors degree in Physics
            </p>
            <p className="text-gray-700">
              Experience: 5 years of tutoring experience
            </p>
            <p className="text-gray-700">{email}</p>
            <p className="text-gray-700">Location: City, State</p>
            <p className="text-gray-700">Rate: {rate}</p>
            <p className="text-gray-700 mt-4">Biography: {bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
