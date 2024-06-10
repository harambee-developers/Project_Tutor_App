import React from "react";

const MessageList = ({ messages }) => {
  return (
    <div className="bg-gray-100 p-10">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Inbox
      </h1>
      <ul className="space-y-2">
        {messages.map((message, index) => (
          <li key={index} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold">{message.senderId}</h2>
            <p>{message.content}</p>
            <div className="text-right text-sm text-gray-500">
              {message.createdAt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
