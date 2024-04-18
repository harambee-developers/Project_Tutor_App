import React from "react";

const ResultsCard = ({ user_id, avatarsrc, name, email, bio, rate }) => {

  return (
    <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden m-4">
      <div className="px-4 py-2">
        <div className="flex items-center gap-6">
          <img
            src={avatarsrc}
            alt="avatar"
            className="h-10 w-10 object-cover"
          ></img>
          <div className="ml-2">
            <a href={`/user/${user_id}`} className="font-bold">
              {name}
            </a>
            <p>{email}</p>
            <p>{bio}</p>
            <p> $ {rate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
