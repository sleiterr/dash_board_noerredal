"use client";
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
