import React from "react";
import PropTypes from "prop-types";

import "./Day.scss";

const Day = ({ day, onClick }) => {
  const className = `day${day.value === "padding" ? " padding" : ""}${
    day.isCurrentDay ? " currentDay" : ""
  }${day.month ? ` ${day.month.split(" ").join("_")} one` : ""}`;
  return (
    <div onClick={onClick} className={className}>
      <p>{day.value === "padding" ? "" : day.value}</p>

      {day.event && typeof day.event.media == "object" && (
        <div className="event">
          <img src={day.event.media[0].mediaurl}></img>
        </div>
      )}
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  onClick: PropTypes.func,
};

export default Day;
