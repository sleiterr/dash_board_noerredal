"use client";

import "temporal-polyfill/global";

import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

const CalendarDashboard = () => {
  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],

    events: [
      {
        id: "1",
        title: "Team Meeting",
        start: Temporal.ZonedDateTime.from(
          "2026-06-24T10:00:00+02:00[Europe/Copenhagen]",
        ),
        end: Temporal.ZonedDateTime.from(
          "2026-06-24T11:00:00+02:00[Europe/Copenhagen]",
        ),
        description: "Discuss project updates and next steps.",
      },
    ],

    selectedDate: Temporal.PlainDate.from("2026-06-24"),
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
  });

  return (
    <section id="calendar" className="flex-1 h-screen">
      <ScheduleXCalendar calendarApp={calendar} />
    </section>
  );
};

export default CalendarDashboard;
