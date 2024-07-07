import React, { useState } from "react";

function ShowMoreText({ text, limit = 100 }) {
  const [isShown, setIsShown] = useState(false);
  const textExceedsLimit = text.length > limit;

  const toggleText = () => {
    setIsShown(!isShown);
  };

  const renderText = () => {
    if (textExceedsLimit && !isShown) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  return (
    <div>
      <p>{renderText()}</p>
      {textExceedsLimit && (
        <button
          onClick={toggleText}
          className="hover:text-teal-400 text-teal-700 font-bold mt-2 text-sm"
        >
          {isShown ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default ShowMoreText;
