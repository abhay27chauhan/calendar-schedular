import React from "react";
import PropTypes from "prop-types";

import "./CalendarHeader.scss";

const CalendarHeader = ({ dateDisplay }) => {
  const dateAsArr = dateDisplay.split(" ");
  const month = dateAsArr[0];
  const year = dateAsArr[1];

  return (
    <>
      <div className="header">
        <p>
          <span>my</span> hair dairy
        </p>
        <div className="monthDisplay">
          <span>{month}</span> {year}
        </div>
      </div>
      <div className="weekdays">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
    </>
  );
};

CalendarHeader.propTypes = {
  dateDisplay: PropTypes.string,
};

export default CalendarHeader;
