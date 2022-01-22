import React from "react";
import PropTypes from "prop-types";

const Day = ({ day, onClick }) => {
  const className = `day${day.value === "padding" ? " padding" : ""}${
    day.isCurrentDay ? " currentDay" : ""
  }${day.month ? ` ${day.month.split(" ").join("_")} one` : ""}`;
  return (
    <div onClick={onClick} className={className}>
      {day.value === "padding" ? "" : day.value}

      {day.event && <div className="event">{day.event.title}</div>}
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.object,
  onClick: PropTypes.func,
};

export default Day;
