import React from "react";
import PropTypes from "prop-types";

import NameInitials from "components/styledComponents/NameInitials";
import ConvertNameInitials from "utils/ConvertNameInitials";
import Rating from "components/Rating/Rating";

import "./Day.scss";

const Day = ({ day, onClick }) => {
  const className = `day${day.value === "padding" ? " padding" : ""}${
    day.isCurrentDay ? " currentDay" : ""
  }${day.month ? ` ${day.month.split(" ").join("_")} one` : ""}`;

  return (
    <div className={className}>
      <p>{day.value === "padding" ? "" : day.value}</p>

      {day.event && typeof day.event.media == "object" && (
        <>
          <div className="rating-container">
            <Rating rating={day.event.rating || 0} maxRating={5} size={10} />
          </div>
          <div className="event">
            <img src={day.event.media[0].mediaurl} onClick={onClick}></img>
          </div>
          <div className="legends">
            {day.event.typeofday?.map((type, index) => (
              <NameInitials
                key={index}
                height="20px"
                width="20px"
                fontSize="10px"
              >
                {ConvertNameInitials(type)}
              </NameInitials>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  onClick: PropTypes.func,
};

export default Day;
