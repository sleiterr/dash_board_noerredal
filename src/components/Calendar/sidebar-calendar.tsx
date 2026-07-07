"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { getDefaultClassNames } from "react-day-picker";
import { useCalendar } from "@/components/Calendar/CalendarContext";
import "temporal-polyfill/global";

const SidebarCalendar = () => {
  const { calendar } = useCalendar();
  const defaultClassNames = getDefaultClassNames();

  // Mirror the selected date from the main calendar
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = calendar.$app.datePickerState.selectedDate.value;
    return new Date(d.year, d.month - 1, d.day);
  });

  // Dates that have at least one event — used for dot indicators
  const [eventDates, setEventDates] = useState<Date[]>([]);

  // Keep selectedDate in sync when main calendar navigates
  useEffect(() => {
    const unsubscribe = calendar.$app.datePickerState.selectedDate.subscribe(
      (date: Temporal.PlainDate) => {
        setSelectedDate(new Date(date.year, date.month - 1, date.day));
      },
    );
    return () => unsubscribe?.();
  }, [calendar]);

  // Recompute event dots whenever the events list changes
  useEffect(() => {
    const update = () => {
      const events = calendar.events.getAll();
      const dates = events.map(
        (e: { start: Temporal.ZonedDateTime | Temporal.PlainDate }) => {
          const s = e.start as Temporal.ZonedDateTime | Temporal.PlainDate;
          return new Date(s.year, s.month - 1, s.day);
        },
      );
      setEventDates(dates);
    };

    const unsubscribe = calendar.$app.calendarEvents.list.subscribe(update);
    update(); // initial load
    return () => unsubscribe?.();
  }, [calendar]);

  // Navigate the main calendar when a date is clicked in the sidebar
  const handleDayClick = (date: Date) => {
    const temporalDate = Temporal.PlainDate.from({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
    calendar.$app.datePickerState.selectedDate.value = temporalDate;
    calendar.$app.calendarState.setRange(temporalDate);
  };

  return (
    <div className="bg-sidebar-bg-calendar p-1 rounded-[14px] shadow-sm w-full">
      <Calendar
        selected={selectedDate}
        onDayClick={handleDayClick}
        modifiers={{ hasEvent: eventDates }}
        modifiersClassNames={{ hasEvent: "day-has-event" }}
        classNames={{
          outside: "opacity-20",
          root: "w-full",
          month: "w-full",
          month_caption:
            "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size) mb-4",
          caption_label: "font-semibold text-quinary text-xs",
          button_previous:
            "flex items-center justify-center w-6 h-6 rounded-full text-calendar-arrow hover:bg-quaternary/10 cursor-pointer",
          button_next:
            "flex items-center justify-center w-6 h-6 rounded-full text-calendar-arrow hover:bg-quaternary/10 cursor-pointer",
          week: cn("mt-2 flex w-full", defaultClassNames.week),
          weekday: "flex-1 font-medium text-xs text-quaternary upercase",
          today: "bg-calendar-toggle rounded-full",
          day: cn(
            "group/day relative aspect-square h-full w-full rounded-(--cell-radius)",
            "font-medium text-sidebar text-sm p-0 text-center select-none",
            "flex items-center justify-center",
            "data-[today=true]:text-secondary",
            defaultClassNames.day,
          ),
          selected: "bg-quaternary text-secondary rounded-full",
        }}
        showOutsideDays
        fixedWeeks
        weekStartsOn={1}
        formatters={{
          formatWeekdayName: (date) =>
            ["S", "M", "T", "W", "T", "F", "S"][date.getDay()],
        }}
      />
    </div>
  );
};

export default SidebarCalendar;
