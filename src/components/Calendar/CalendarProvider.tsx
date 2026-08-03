"use client";

import { useEffect, useState } from "react";
import { useCalendarApp } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";

// Import plugins for event modals and drag-and-drop functionality
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

import CalendarContext from "./CalendarContext";
import { getTasksAction } from "@/app/actions/tasks";
// Import the updateTaskAction for updating events after drag-and-drop
import { updateTaskAction } from "@/app/actions/tasks";
import "temporal-polyfill/global";

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize the event modal plugin for displaying event details
  const [eventModal] = useState(() => createEventModalPlugin());
  // State to track hidden employee IDs for filtering events in the calendar
  const [hiddenEmployeeIds, setHiddenEmployeeIds] = useState<Set<string>>(
    new Set(),
  );
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const openNewEventModal = () => setIsNewEventModalOpen(true);
  const closeNewEventModal = () => setIsNewEventModalOpen(false);

  // Function to toggle the visibility of an employee's events in the calendar
  const toggleEmployeeVisibility = (employeeId: string) => {
    setHiddenEmployeeIds((prev) => {
      // Create a new Set to avoid mutating the previous state directly
      const next = new Set(prev);
      if (next.has(employeeId)) {
        next.delete(employeeId);
      } else {
        next.add(employeeId);
      }
      return next;
    });
  };

  // Initialize the calendar app with the specified configuration
  const calendar = useCalendarApp({
    timezone: "Europe/Copenhagen",
    locale: "da-DK",
    firstDayOfWeek: 1, // Monday use for the week view
    showWeekNumbers: true,
    dayBoundaries: {
      start: "05:00",
      end: "18:00",
    },
    views: [
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
      createViewDay(),
    ],
    events: [],
    selectedDate: Temporal.Now.plainDateISO("Europe/Copenhagen"),
    plugins: [eventModal, createDragAndDropPlugin()],
    // Callback for when an event is updated (e.g., after drag-and-drop)
    callbacks: {
      onEventUpdate: async (event) => {
        const start = event.start as Temporal.ZonedDateTime;
        const end = event.end as Temporal.ZonedDateTime;
        try {
          await updateTaskAction(String(event.id), {
            title: event.title ?? "Untitled",
            employee_id: (event as any).employeeId ?? null,
            start_at: start.toPlainDateTime().toString(),
            end_at: end.toPlainDateTime().toString(),
          });
        } catch {
          console.error("Failed to update event after drag-and-drop");
        }
      },
    },
  });

  // Load real tasks from DB on mount
  const loadTasks = async () => {
    if (!calendar) return;
    const tasks = await getTasksAction();

    const events = tasks
      // filter out tasks that belong to hidden employees
      .filter(
        (task) => !task.employee_id || !hiddenEmployeeIds.has(task.employee_id),
      )
      // map the tasks to the format expected by the calendar
      .map((task) => ({
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
        employeeId: task.employee_id ?? null,
      }));
    calendar.events.set(events);
  };

  useEffect(() => {
    loadTasks();
  }, [calendar, hiddenEmployeeIds]);

  if (!calendar) {
    return null;
  }
  return (
    <CalendarContext.Provider
      value={{
        calendar,
        refetchTasks: loadTasks,
        eventModal,
        hiddenEmployeeIds,
        toggleEmployeeVisibility,
        isNewEventModalOpen,
        openNewEventModal,
        closeNewEventModal,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
