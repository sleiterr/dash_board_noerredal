"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "temporal-polyfill/global";

type CalendarToolbarProps = {
  calendar: any;
};

const CalendarToolbar = ({ calendar }: CalendarToolbarProps) => {
  if (!calendar) return null;

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

  const title = new Date(
    currentDate.year,
    currentDate.month - 1,
  ).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (direction: "next" | "prev") => {
    const amount = direction === "next" ? 1 : -1;
    const newDate = currentDate.add({ months: amount });

    calendar.$app.datePickerState.selectedDate.value = newDate;
    calendar.$app.calendarState.setRange(newDate);
  };

  const goToday = () => {
    const today = Temporal.Now.plainDateISO();

    calendar.$app.datePickerState.selectedDate.value = today;
    calendar.$app.calendarState.setRange(today);
  };

  const changeView = (view: "day" | "week" | "month-grid") => {
    // setView приймає (view, PlainDate) — так само як setRange
    calendar.$app.calendarState.setView(view, currentDate);
  };

  return (
    <div className="calendar-toolbar">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => changeMonth("prev")}>
          <ChevronLeft />
        </button>

        <span>{title}</span>

        <button type="button" onClick={() => changeMonth("next")}>
          <ChevronRight />
        </button>
      </div>
      <div className="">
        <button type="button" onClick={() => changeView("day")}>
          Day
        </button>
      </div>
      <div>
        <button type="button" onClick={goToday}>
          Today
        </button>
        <button type="button" onClick={() => changeView("week")}>
          Weekly
        </button>
        <button type="button" onClick={() => changeView("month-grid")}>
          Month
        </button>
      </div>
    </div>
  );
};

export default CalendarToolbar;
