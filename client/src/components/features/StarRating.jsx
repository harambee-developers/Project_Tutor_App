import React from "react";

const StarRating = ({ rating }) => {
    const numericRating = Number(rating)
    const isValidRating = !isNaN(numericRating) &&
    numericRating >= 0 && numericRating <= 5

  const maxStars = 5;
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating - fullStars > 0;

  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < maxStars; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            &#9733;
          </span>
        );
      } else if (hasHalfStar && i === fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400">
            &#9733;
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
      <span className="text-sm text-gray-600">{numericRating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
