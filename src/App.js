import React, { useState, useEffect, useRef } from "react";

import CalendarHeader from "components/CalendarHeader/CalendarHeader";
import Day from "components/Day/Day";
import NewEventModal from "components/NewEventModal/NewEventModal";
import { useDate } from "Hooks/useDate";
import useFetch from "Hooks/useFetch/useFetch";
import { generateDates } from "utils/utils";
import { url, weekdays } from "utils/constants";

import "./styles/main.scss";

const App = () => {
  useFetch(url);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState([]);
  const { days, dateDisplay, setDays } = useDate(events);

  const top = useRef(-1);
  const bottom = useRef(1);

  const eventForDate = (date) => events.find((e) => e.date === date);

  const topCallback = async (entries) => {
    entries.forEach((element) => {
      if (element.isIntersecting) {
        top.current = top.current - 1;
        console.log(top.current);
      }
    });
  };

  const bottomCallback = async (entries) => {
    entries.forEach((element) => {
      if (element.isIntersecting) {
        bottom.current = bottom.current + 1;
        let daysArr = [];
        console.log(bottom.current);
        generateDates(weekdays, bottom.current, daysArr, events);
        const totalDaysArr = [...days, ...daysArr];
        console.log(totalDaysArr);
        setDays(totalDaysArr);
      }
    });
  };

  const topObserver = new IntersectionObserver(topCallback, {
    root: document.querySelector(".calendar"),
    rootMargin: "200px 0px 0px 0px",
  });

  const bottomObserver = new IntersectionObserver(bottomCallback, {
    root: document.querySelector(".calendar"),
    rootMargin: "0px 0px -10px 0px",
  });

  useEffect(() => {
    let elements = document.querySelectorAll(".day");
    if (elements[0] && elements.length < 100) {
      let currentDayElem = document.querySelector(".currentDay");
      currentDayElem && currentDayElem.scrollIntoView();
    }

    if (elements[0]) {
      topObserver.observe(elements[0]);
      bottomObserver.observe(elements[elements.length - 1]);
    }

    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, [days]);

  return (
    <>
      <div className="container">
        <CalendarHeader dateDisplay={dateDisplay} />
        <div className="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== "padding") {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {clicked && !eventForDate(clicked) && (
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={(title) => {
            setEvents([...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      )}
    </>
  );
};

export default App;
