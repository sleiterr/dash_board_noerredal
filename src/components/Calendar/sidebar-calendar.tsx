"use client";

import { Calendar } from "@/components/ui/calendar";

const SidebarCalendar = () => {
  return (
    <div className="bg-sidebar-bg-calendar p-4 rounded-[14px] shadow-sm">
      <Calendar
        weekStartsOn={1}
        formatters={{
          formatWeekdayName: (date) =>
            ["M", "T", "W", "T", "F", "S", "S"][date.getDay()],
        }}
      />
    </div>
  );
};

export default SidebarCalendar;
