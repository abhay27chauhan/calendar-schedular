import React from "react";
import PropTypes from "prop-types";

import "./Day.scss";
import NameInitials from "components/styledComponents/NameInitials";
import ConvertNameInitials from "utils/ConvertNameInitials";

const Day = ({ day, onClick }) => {
  const className = `day${day.value === "padding" ? " padding" : ""}${
    day.isCurrentDay ? " currentDay" : ""
  }${day.month ? ` ${day.month.split(" ").join("_")} one` : ""}`;
  console.log(day.event?.typeofday, day.event?.date);
  return (
    <div onClick={onClick} className={className}>
      <p>{day.value === "padding" ? "" : day.value}</p>

      {day.event && typeof day.event.media == "object" && (
        <>
          <div className="event">
            <img src={day.event.media[0].mediaurl}></img>
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
