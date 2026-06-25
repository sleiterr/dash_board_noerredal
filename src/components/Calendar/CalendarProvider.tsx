"use client";

import { useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";

import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import CalendarContext from "./CalendarContext";
import "temporal-polyfill/global";

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
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
    <CalendarContext.Provider value={{ calendar }}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
