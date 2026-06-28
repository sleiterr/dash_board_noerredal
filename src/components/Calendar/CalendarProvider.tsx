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
    timezone: "Europe/Copenhagen",
    locale: "da-DK",
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
          "2026-06-28T12:00:00+02:00[Europe/Copenhagen]",
        ),
        end: Temporal.ZonedDateTime.from(
          "2026-06-28T15:00:00+02:00[Europe/Copenhagen]",
        ),
      },
    ],

    // @ts-ignore
    timezone: "Europe/Copenhagen",
    selectedDate: Temporal.PlainDate.from("2026-06-28"),
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
