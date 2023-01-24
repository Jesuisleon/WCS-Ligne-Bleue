// a component to display the rating of a tutorial
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

function Rating({ validate, data, setData }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    if (rating && validate === false) {
      const newRating = {
        ...data,
        rating,
      };
      setData(newRating);
    }
  }, [rating]);

  const [hover, setHover] = useState(0);

  const handleRating = (e) => {
    setRating(e);
  };

  const handleHover = (e) => {
    setHover(e);
  };

  const handleLeave = () => {
    setHover(0);
  };

  useEffect(() => {
    if (validate) setRating(data.rating);
  }, []);

  if (validate && data.rating === null) return false;

  // if validate is true, the rating is displayed
  if (validate) {
    return (
      <div className="flex-col md:flex-row flex gap-2 md:gap-4 md:items-center w-full px-10">
        <p className="h1-font">Ma note : </p>
        <div className="flex gap-2">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <div key={ratingValue}>
                <FaStar
                  className="star"
                  color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                  size={35}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // if validate is false, the rating is editable
  return (
    <div className="flex-col md:flex-row flex gap-2 md:gap-4 md:items-center w-full px-10">
      <p className="h1-font">Ma note : </p>
      <div className="flex gap-2">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <div key={ratingValue}>
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={35}
                onClick={() => handleRating(ratingValue)}
                onMouseEnter={() => handleHover(ratingValue)}
                onMouseLeave={handleLeave}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rating;
