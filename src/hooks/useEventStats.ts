"use client";

import { useEffect, useState } from "react";
import { useCalendar } from "@/components/Calendar/CalendarContext";
import "temporal-polyfill/global";

// export function for useEventStats hook
export const useEventStats = (): EventStats => {
  // Get the calendar context
  const { calendar } = useCalendar();

  // Function to calculate event statistics
  const getStats = () => {
    // events is an array of all events in the calendar
    const events = calendar.$app.calendarEvents.list.value;
    // today is the current date in ISO format
    const today = Temporal.Now.plainDateISO();

    console.log("today:", today.toString());
    console.log("events count:", events.length);
    events.forEach((event: any) => {
      console.log("event start:", event._start.toPlainDate().toString());
    });

    // dayOfWeek is the current day of the week (1-7)
    const dayOfWeek = today.dayOfWeek;
    // weekStart is the start of the current week (Monday)
    const weekStart = today.subtract({ days: dayOfWeek - 1 });
    // weekEnd is the end of the current week (Sunday)
    const weekEnd = weekStart.add({ days: 6 });

    // Calculate the total number of events today and this week
    const totalEventsToday = events.filter((event: any) => {
      // eventDate is the date of the event in ISO format
      const eventDate = event._start.toPlainDate();
      // return true if the event date is today, false otherwise
      return Temporal.PlainDate.compare(eventDate, today) === 0;
    }).length;

    // totalEventsThisWeek is the total number of events that occur between weekStart and weekEnd (inclusive)
    const totalEventsThisWeek = events.filter((event: any) => {
      const eventDate = event._start.toPlainDate();
      // return true if the event date is between weekStart and weekEnd (inclusive), false otherwise
      return (
        Temporal.PlainDate.compare(eventDate, weekStart) >= 0 &&
        Temporal.PlainDate.compare(eventDate, weekEnd) <= 0
      );
      // length is used to get the total number of events that match the filter criteria
    }).length;

    return {
      totalEventsToday,
      totalEventsThisWeek,
    };
  };

  // State to hold the event statistics
  const [stats, setStats] = useState<EventStats>(getStats);

  // Effect to subscribe to calendar events and update statistics when events change
  useEffect(() => {
    // Subscribe to calendar events and update statistics when events change
    const unsubscribe = calendar.$app.calendarEvents.list.subscribe(() => {
      setStats(getStats());
    });
    // return a cleanup function to unsubscribe from calendar events when the component unmounts
    return () => {
      unsubscribe();
    };
    // [calendar] - re-run the effect when the calendar context changes
  }, [calendar]);
  // Return the event statistics
  return stats;
};

type EventStats = {
  totalEventsToday: number;
  totalEventsThisWeek: number;
};
