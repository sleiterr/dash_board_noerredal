"use client";
import CalendarWeekdays from "./CalendarWeekdays";
import CalendarToolbar from "./CalendarToolbar";
import "temporal-polyfill/global";

import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

const CalendarDashboard = ({}) => {
  const calendar = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
      createViewDay(),
    ],

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

    // @ts-ignore
    selectedDate: Temporal.PlainDate.from("2026-06-24"),
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
  });

  if (!calendar) {
    return null;
  }

  return (
    <section id="calendar" className="flex-1 flex-col overflow-hidden">
      <CalendarToolbar calendar={calendar} />
      <CalendarWeekdays />
      <ScheduleXCalendar calendarApp={calendar} />
    </section>
  );
};

export default CalendarDashboard;
