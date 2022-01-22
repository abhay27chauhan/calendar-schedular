import { useEffect, useState } from "react";

import { weekdays } from "utils/constants";
import { generateDates } from "utils/utils";

export const useDate = (events) => {
  const [dateDisplay, setDateDisplay] = useState("");
  const [days, setDays] = useState([]);
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    const dt = new Date();
    const year = dt.getFullYear();

    setDateDisplay(
      `${dt.toLocaleDateString("en-us", { month: "short" })} ${year}`,
    );

    const daysArr = [];

    generateDates(weekdays, -1, daysArr, events, setPadding);
    generateDates(weekdays, 0, daysArr, events);
    generateDates(weekdays, 1, daysArr, events);

    setDays(daysArr);
  }, [events]);

  return {
    padding,
    setPadding,
    days,
    dateDisplay,
    setDays,
  };
};
