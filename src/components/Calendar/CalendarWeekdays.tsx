"use client";

import { useEffect, useState } from "react";
import { useCalendar } from "./CalendarContext";

const weekdays = [
  { id: 1, label: "Mon" },
  { id: 2, label: "Tue" },
  { id: 3, label: "Wed" },
  { id: 4, label: "Thu" },
  { id: 5, label: "Fri" },
  { id: 6, label: "Sat" },
  { id: 7, label: "Sun" },
];

const CalendarWeekdays = () => {
  const { calendar } = useCalendar();
  const [currentView, setCurrentView] = useState<string>(
    () => calendar.$app.calendarState.view.value,
  );

  useEffect(() => {
    const unsubscribe = calendar.$app.calendarState.view.subscribe(
      (view: string) => {
        setCurrentView(view);
      },
    );
    return () => {
      unsubscribe();
    };
  }, [calendar]);

  if (currentView !== "month-grid") {
    return null;
  }

  return (
    <div className="calendar-weekdays">
      {weekdays.map(({ id, label }) => (
        <span key={id} className="font-medium text-center text-xs text-senary">
          {label}
        </span>
      ))}
    </div>
  );
};

export default CalendarWeekdays;
