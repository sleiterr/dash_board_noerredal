"use client";

import { useEffect, useState } from "react";
import "temporal-polyfill/global";
import { useCalendar } from "@/components/Calendar/CalendarContext";

const CalendarViewSwitcher = () => {
  const { calendar } = useCalendar();

  const [currentDate, setCurrentDate] = useState<Temporal.PlainDate>(
    () => calendar.$app.datePickerState.selectedDate.value,
  );

  useEffect(() => {
    const unsubscribe = calendar.$app.datePickerState.selectedDate.subscribe(
      (date: Temporal.PlainDate) => {
        setCurrentDate(date);
      },
    );
    return () => unsubscribe?.();
  }, [calendar]);

  const changeView = (view: "day" | "week" | "month-grid") => {
    // setView приймає (view, PlainDate) — same as setRange, so we can use the currentDate to keep the same date when changing views
    calendar.$app.calendarState.setView(view, currentDate);
  };

  return (
    <>
      <button type="button" onClick={() => changeView("day")}>
        Daily
      </button>
      <button type="button" onClick={() => changeView("week")}>
        Weekly
      </button>
      <button type="button" onClick={() => changeView("month-grid")}>
        Monthly
      </button>
    </>
  );
};

export default CalendarViewSwitcher;
