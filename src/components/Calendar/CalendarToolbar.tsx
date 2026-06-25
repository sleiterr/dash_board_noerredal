"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "temporal-polyfill/global";
import { useCalendar } from "./CalendarContext";

const CalendarToolbar = () => {
  // Access the calendar context
  const { calendar } = useCalendar();

  // State to hold the current date
  const [currentDate, setCurrentDate] = useState<Temporal.PlainDate>(
    () => calendar.$app.datePickerState.selectedDate.value,
  );

  // Subscribe to changes in the selected date and update the state accordingly
  useEffect(() => {
    const unsubscribe = calendar.$app.datePickerState.selectedDate.subscribe(
      (date: Temporal.PlainDate) => {
        setCurrentDate(date);
      },
    );
    return () => unsubscribe?.();
  }, [calendar]);

  // Format the current date to display the month and year in a readable format
  const title = new Date(
    currentDate.year,
    currentDate.month - 1,
  ).toLocaleString("en-DK", {
    month: "long",
    year: "numeric",
  });

  //! Function to change the month based on the direction (next or prev)
  const changeMonth = (direction: "next" | "prev") => {
    const amount = direction === "next" ? 1 : -1;
    const newDate = currentDate.add({ months: amount });

    calendar.$app.datePickerState.selectedDate.value = newDate;
    calendar.$app.calendarState.setRange(newDate);
  };

  //! Function to go to today's date
  const goToday = () => {
    const today = Temporal.Now.plainDateISO();

    calendar.$app.datePickerState.selectedDate.value = today;
    calendar.$app.calendarState.setRange(today);
  };

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-header-bg border-b border-header-border">
      <div className="flex items-center justify-between w-full max-w-72.5">
        <button
          className="p-2 rounded-full hover:bg-cta-bg transition-colors duration-300 cursor-pointer"
          type="button"
          onClick={() => changeMonth("prev")}
        >
          <ChevronLeft className="text-calendar-arrow h-4 w-4" />
        </button>

        <span className="font-medium text-base text-calendar-title">
          {title}
        </span>

        <button
          className="p-2 rounded-full hover:bg-cta-bg transition-colors duration-300 cursor-pointer"
          type="button"
          onClick={() => changeMonth("next")}
        >
          <ChevronRight className="text-calendar-arrow h-4 w-4" />
        </button>
      </div>

      <div>
        <button
          className="font-medium text-xs text-cta-link bg-cta-bg px-4 py-2 rounded-4xl hover:bg-cta-link hover:text-white transition-colors duration-300 cursor-pointer"
          type="button"
          onClick={goToday}
        >
          Today
        </button>
      </div>
    </header>
  );
};

export default CalendarToolbar;
