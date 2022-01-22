export const eventForDate = (date, events) =>
  events.find((e) => e.date === date);

export function generateDates(weekdays, nav, daysArr, events, setPadding) {
  const date = new Date();
  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddingDays = setPadding
    ? weekdays.indexOf(dateString.split(", ")[0])
    : 0;
  setPadding && setPadding(paddingDays);

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daysArr.push({
        value: i - paddingDays,
        event: eventForDate(dayString, events),
        isCurrentDay:
          i - paddingDays === day && new Date().getMonth() === month,
        date: dayString,
      });
    } else if (i <= paddingDays && setPadding) {
      daysArr.push({
        value: "padding",
        event: null,
        isCurrentDay: false,
        date: "",
      });
    }
  }
}
