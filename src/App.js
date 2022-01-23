import React, { useState, useEffect, useRef } from "react";

import CalendarHeader from "components/CalendarHeader/CalendarHeader";
import DateMarker from "components/DateMarker/DateMarker";
import Day from "components/Day/Day";
import Modal from "components/Modal/Modal";
import { useDate } from "Hooks/useDate";
import useFetch from "Hooks/useFetch/useFetch";
import { generateDates } from "utils/utils";
import { url, weekdays } from "utils/constants";

import "./styles/main.scss";

const App = () => {
  const [result] = useFetch(url);
  const [clicked, setClicked] = useState(null);
  const [events, setEvents] = useState([]);
  const { days, dateDisplay, padding, setDays, setPadding, setDateDisplay } =
    useDate(events);

  const top = useRef(-1);
  const bottom = useRef(1);

  const topCallback = async (entries) => {
    entries.forEach((element) => {
      if (element.isIntersecting) {
        top.current = top.current - 1;
        let daysArr = [];
        let removePadding = days.slice(padding);
        generateDates(weekdays, top.current, daysArr, events, setPadding);
        const totalDaysArr = [...daysArr, ...removePadding];
        setDays(totalDaysArr);
      }
    });
  };

  const bottomCallback = async (entries) => {
    entries.forEach((element) => {
      if (element.isIntersecting) {
        bottom.current = bottom.current + 1;
        let daysArr = [];
        generateDates(weekdays, bottom.current, daysArr, events);
        const totalDaysArr = [...days, ...daysArr];
        setDays(totalDaysArr);
      }
    });
  };

  const monthChangeCallback = async (entries) => {
    entries.forEach((element) => {
      if (element.isIntersecting) {
        let marker = document.querySelector(".marker");
        marker.style.display = "block";
        const dateString = element.target.classList[1].split("_").join(" ");
        setDateDisplay(dateString);
        setTimeout(() => (marker.style.display = "none"), 800);
      }
    });
  };

  const topObserver = new IntersectionObserver(topCallback, {
    root: document.querySelector(".calendar"),
    rootMargin: "100px 0px 0px 0px",
  });

  const bottomObserver = new IntersectionObserver(bottomCallback, {
    root: document.querySelector(".calendar"),
    rootMargin: "0px 0px -10px 0px",
  });

  const monthChangeObserver = new IntersectionObserver(monthChangeCallback, {
    root: document.querySelector(".calendar"),
    rootMargin: "-100px 0px -300px 0px",
  });

  useEffect(() => {
    result && setEvents(result);
  }, [result]);

  useEffect(() => {
    let elements = document.querySelectorAll(".day");
    let firstDays = document.querySelectorAll(".one");
    if (elements[0] && elements.length < 100) {
      let currentDayElem = document.querySelector(".currentDay");
      currentDayElem && currentDayElem.scrollIntoView();
    }

    if (elements[0]) {
      topObserver.observe(elements[0]);
      bottomObserver.observe(elements[elements.length - 1]);
      firstDays.forEach((el) => {
        monthChangeObserver.observe(el);
      });
    }

    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
      monthChangeObserver.disconnect();
    };
  }, [days]);

  return (
    <>
      <div className="container">
        <CalendarHeader dateDisplay={dateDisplay} />
        <div className="calendar">
          {days.map((d, index) => (
            <Day
              key={d.date ? d.date : index}
              day={d}
              onClick={() => {
                if (d.value !== "padding") {
                  setClicked(d.event.media);
                }
              }}
            />
          ))}
          <DateMarker dateDisplay={dateDisplay} />
        </div>
      </div>

      {clicked && <Modal media={clicked} onClose={() => setClicked(null)} />}
    </>
  );
};

export default App;
