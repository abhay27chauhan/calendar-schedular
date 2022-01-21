import React, { useState, useEffect } from "react";

import CalendarHeader from "components/CalendarHeader/CalendarHeader";
import Day from "components/Day/Day";
import { useDate } from "Hooks/useDate";
import useFetch from "Hooks/useFetch/useFetch";
import NewEventModal from "components/NewEventModal/NewEventModal";

import "./styles/main.scss";

const App = () => {
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState([]);
  const { days, dateDisplay } = useDate(events);
  useFetch("https://api.quinn.care/graph");

  const eventForDate = (date) => events.find((e) => e.date === date);

  const topCallback = async (entries) => {
    entries.forEach((element) => {
      console.log(element);
    });
  };

  const bottomCallback = async (entries) => {
    entries.forEach((element) => {
      console.log(element);
    });
  };

  const topObserver = new IntersectionObserver(topCallback, {
    root: document.querySelector(".calendar"),
    rootMargin: "200px 0px 0px 0px",
  });

  const bottomObserver = new IntersectionObserver(bottomCallback, {
    root: document.querySelector(".calendar"),
    rootMargin: "0px 0px 200px 0px",
  });

  useEffect(() => {
    let elements = document.querySelectorAll(".day");
    let currentDayElem = document.querySelector(".currentDay");
    currentDayElem && currentDayElem.scrollIntoView();
    if (elements[0]) {
      topObserver.observe(elements[0]);
      bottomObserver.observe(elements[elements.length - 1]);
    }

    return () => {
      elements[0] && topObserver.unobserve(elements[0]);
      elements[0] && topObserver.unobserve(elements[elements.length - 1]);
    };
  }, [days]);

  return (
    <>
      <div className="container">
        <CalendarHeader dateDisplay={dateDisplay} />
        {console.log(days)}
        <div className="calendar">
          {days.map((d, index) => (
            <Day
              key={d.date ? d.date : index}
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
