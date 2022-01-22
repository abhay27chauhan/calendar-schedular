import React from "react";
import PropTypes from "prop-types";

import "./DateMarker.scss";

function DateMarker({ dateDisplay }) {
  const dateAsArr = dateDisplay.split(" ");
  const month = dateAsArr[0];
  const year = dateAsArr[1];

  return (
    <div className="marker">
      <span>{month}</span> {year}
    </div>
  );
}

DateMarker.propTypes = {
  dateDisplay: PropTypes.string,
};

export default DateMarker;
