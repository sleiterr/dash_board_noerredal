"use client";

import { useEffect } from "react";
import CalendarWeekdays from "./CalendarWeekdays";
import CalendarToolbar from "./CalendarToolbar";

import "temporal-polyfill/global";
import { useCalendar } from "./CalendarContext";
import { ScheduleXCalendar } from "@schedule-x/react";
import CalendarEventTile from "./CalendarEventTile";
import CustomEventModal from "./CustomEventModal";

// Custom components for the calendar, including the event modal
const customComponents = {
  monthGridEvent: (props: any) => (
    <CalendarEventTile {...props} variant="month" />
  ),
  timeGridEvent: (props: any) => (
    <CalendarEventTile {...props} variant="week" />
  ), // Use the same tile for time grid events
  eventModal: ({ calendarEvent }: { calendarEvent: any }) => (
    <CustomEventModal calendarEvent={calendarEvent} />
  ),
};

const CalendarDashboard = ({}) => {
  const { calendar } = useCalendar();

  useEffect(() => {
    // Highlight the current day column in the week views
    const container = document.getElementById("calendar");
    if (!container) return;

    // Function to apply the highlight to the current day column
    const applyHighlight = () => {
      const dayColumns =
        container.querySelectorAll<HTMLElement>(".sx__time-grid-day");
      if (dayColumns.length === 0) return;

      // Reset background color for all day columns
      dayColumns.forEach((col) => {
        col.style.backgroundColor = "";
      });

      // Get the current day of the week (1 = Monday, 7 = Sunday)
      const isoWeekday = new Date().getDay() === 0 ? 7 : new Date().getDay();

      // Highlight the current day column
      const targetColumn = dayColumns[isoWeekday - 1];
      if (targetColumn) {
        targetColumn.style.backgroundColor = "rgba(247, 243, 236, 0.6)";
      }
    };

    applyHighlight(); // Call the function initially to highlight the current day

    // Observe changes in the calendar container to reapply the highlight when needed
    const observer = new MutationObserver(applyHighlight);
    observer.observe(container, { childList: true, subtree: true });

    // Return a cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <section id="calendar" className="flex flex-1 flex-col overflow-hidden">
      <CalendarToolbar />
      <CalendarWeekdays />
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={customComponents}
      />
    </section>
  );
};

export default CalendarDashboard;
