import React from "react";
import PropTypes from "prop-types";

import "./Rating.scss";

function Rating({ rating, maxRating, size = 16 }) {
  return (
    <div className="rating">
      {new Array(maxRating).fill(0).map((_, index) => {
        const isActive = rating >= index + 1;
        return isActive ? (
          <i
            key={index}
            className="fas fa-star rating__star rating__star--active"
            style={{ fontSize: size }}
          ></i>
        ) : (
          <i
            key={index}
            className="far fa-star rating__star"
            style={{ fontSize: size }}
          ></i>
        );
      })}
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number,
  maxRating: PropTypes.number,
  size: PropTypes.number,
};

export default Rating;
