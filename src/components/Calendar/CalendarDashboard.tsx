"use client";
import CalendarWeekdays from "./CalendarWeekdays";
import CalendarToolbar from "./CalendarToolbar";
import "temporal-polyfill/global";
import { useCalendar } from "./CalendarContext";
import { ScheduleXCalendar } from "@schedule-x/react";
import CalendarEventTile from "./CalendarEventTile";

const CalendarDashboard = ({}) => {
  const { calendar } = useCalendar();

  return (
    <section id="calendar" className="flex flex-1 flex-col overflow-hidden">
      <CalendarToolbar />
      <CalendarWeekdays />
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={{
          monthGridEvent: CalendarEventTile,
        }}
      />
    </section>
  );
};

export default CalendarDashboard;
