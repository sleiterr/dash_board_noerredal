"use client";

import { useEffect } from "react";
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
import { getTasksAction } from "@/app/actions/tasks";
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
    events: [],
    selectedDate: Temporal.Now.plainDateISO("Europe/Copenhagen"),
    plugins: [createEventModalPlugin(), createDragAndDropPlugin()],
  });

  // Load real tasks from DB on mount
  useEffect(() => {
    if (!calendar) return;
    getTasksAction()
      .then((tasks) => {
        const events = tasks.map((task) => ({
          id: String(task.id),
          title: task.title ?? "Untitled",
          start: Temporal.PlainDateTime.from(
            task.start_at.replace(" ", "T"),
          ).toZonedDateTime("Europe/Copenhagen"),
          end: Temporal.PlainDateTime.from(
            task.end_at.replace(" ", "T"),
          ).toZonedDateTime("Europe/Copenhagen"),
          // Custom props — picked up by CalendarEventTile for color/avatar styling
          employeeColor:
            (task.employee as { color?: string; full_name?: string } | null)
              ?.color ?? null,
          employeeName:
            (task.employee as { full_name?: string } | null)?.full_name ?? null,
        }));
        calendar.events.set(events);
      })
      .catch(console.error);
  }, [calendar]);

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
