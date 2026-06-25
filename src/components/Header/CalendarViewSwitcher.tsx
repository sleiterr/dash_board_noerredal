"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import "temporal-polyfill/global";
import { useCalendar } from "@/components/Calendar/CalendarContext";

const CalendarViewSwitcher = () => {
  // Get the current date from the calendar context to maintain the same date when switching views
  const { calendar } = useCalendar();

  // State to keep track of the current date
  const [currentDate, setCurrentDate] = useState<Temporal.PlainDate>(
    () => calendar.$app.datePickerState.selectedDate.value,
  );

  // Update the current date whenever the selected date in the calendar changes
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
    <div className="flex items-center justify-center gap-1 rounded-full bg-cta-bg w-57 h-10 px-2 py-1 text-sm font-medium text-cta-link">
      <button
        className={clsx(
          "font-medium text-xs text-ext-view-toggle",
          " hover:text-secondary hover:bg-calendar-toggle transition-all duration-300 px-4 py-2 rounded-full cursor-pointer hover:shadow-md",
        )}
        type="button"
        onClick={() => changeView("day")}
      >
        Daily
      </button>
      <button
        className={clsx(
          "font-medium text-xs text-ext-view-toggle",
          " hover:text-secondary hover:bg-calendar-toggle transition-all duration-300 px-4 py-2 rounded-full cursor-pointer hover:shadow-md",
        )}
        type="button"
        onClick={() => changeView("week")}
      >
        Weekly
      </button>
      <button
        className={clsx(
          "font-medium text-xs text-ext-view-toggle",
          " hover:text-secondary hover:bg-calendar-toggle transition-all duration-300 px-4 py-2 rounded-full cursor-pointer hover:shadow-md",
        )}
        type="button"
        onClick={() => changeView("month-grid")}
      >
        Monthly
      </button>
    </div>
  );
};

export default CalendarViewSwitcher;
