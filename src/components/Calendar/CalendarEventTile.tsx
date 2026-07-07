"use client";

import clsx from "clsx";
import { EVENT_COLOR_DATA } from "@/lib/eventColors";
import type { EventColor } from "@/lib/types";

const CalendarEventTile = ({
  calendarEvent,
  hasStartDate,
}: CalendarEventTileProps) => {
  const color = calendarEvent.employeeColor;
  const ec = color ? EVENT_COLOR_DATA[color] : null;

  return (
    <div
      className={clsx(
        "w-full truncate rounded-md px-1.5 py-0.5 text-xs font-medium",
        "transition-opacity duration-150 cursor-pointer",
        ec ? [ec.bgClass, ec.textClass] : "bg-zinc-200 text-zinc-700",
        // Dim multi-day events that start before this cell
        !hasStartDate && "opacity-70",
      )}
    >
      {calendarEvent.title}
    </div>
  );
};

export default CalendarEventTile;

// Props passed by schedule-x to monthGridEvent custom component
type CalendarEventTileProps = {
  calendarEvent: {
    id: string;
    title?: string;
    employeeColor?: EventColor | null;
    [key: string]: unknown;
  };
  hasStartDate: boolean;
};
