"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { getDefaultClassNames } from "react-day-picker";

const SidebarCalendar = () => {
  // Get the default class names from react-day-picker
  const defaultClassNames = getDefaultClassNames();

  return (
    <div className="bg-sidebar-bg-calendar p-1 rounded-[14px] shadow-sm w-full">
      <Calendar
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
          today: "bg-calendar-today rounded-full",
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
