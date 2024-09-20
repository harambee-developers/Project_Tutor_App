import React from "react";

const StarRating = ({ rating }) => {
  const numericRating = Number(rating);
  const isValidRating =
    !isNaN(numericRating) && numericRating >= 0 && numericRating <= 5;

  const maxStars = 5;
  const fullStars = Math.floor(numericRating);
  const partialStarWidth = (numericRating - fullStars) * 100;

  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < maxStars; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="relative inline-block overflow-hidden text-yellow-400">
            &#9733;
          </span>
        );
      } else if (i === fullStars && partialStarWidth > 0) {
        stars.push(
          <span key={i} className="relative inline-block">
            <span
              className="absolute top-0 left-0 h-full overflow-hidden text-yellow-400"
              style={{ width: `${partialStarWidth}%` }}
            >
              &#9733;
            </span>
            <span className="text-gray-300">&#9733;</span>
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center">
      <div className="flex mr-2">{renderStars()}</div>
    </div>
  );
};

export default StarRating;
