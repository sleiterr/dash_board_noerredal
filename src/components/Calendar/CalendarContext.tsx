"use client";

import { createContext, useContext } from "react";
import type { createEventModalPlugin } from "@schedule-x/event-modal";

// Define the context type for the calendar
const CalendarContext = createContext<CalendarContextType | null>(null);

export const useCalendar = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};

export default CalendarContext;

type CalendarContextType = {
  calendar: any; // Replace 'any' with the actual type of your calendar object
  refetchTasks: () => Promise<void>;
  eventModal: ReturnType<typeof createEventModalPlugin>;
};
