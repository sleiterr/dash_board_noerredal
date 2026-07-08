"use client";

import clsx from "clsx";
import { EVENT_COLOR_DATA, getInitials } from "@/lib/eventColors";
import type { EventColor } from "@/lib/types";

const CalendarEventTile = ({
  calendarEvent,
  hasStartDate,
}: CalendarEventTileProps) => {
  const color = calendarEvent.employeeColor;
  const ec = color ? EVENT_COLOR_DATA[color] : null;
  const employeeName = calendarEvent.employeeName;

  // const handleClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (confirm(`Delete "${calendarEvent.title}"?`)) {
  //     onDelete?.(calendarEvent.id);
  //   }
  // };

  return (
    <div
      title={
        employeeName
          ? `${calendarEvent.title} - ${employeeName}`
          : calendarEvent.title
      }
      className={clsx(
        "w-full truncate rounded-md px-1.5 py-0.5 text-xs font-medium",
        "transition-opacity duration-150 cursor-pointer",
        "flex items-center gap-1", // ← цей рядок пропущений, додай назад
        ec ? [ec.bgClass, ec.textClass] : "bg-zinc-200 text-zinc-700",
        !hasStartDate && "opacity-70",
      )}
    >
      {employeeName ? (
        <div
          className={clsx(
            "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[7px] font-bold",
            ec?.avatarBg,
            ec?.avatarText,
          )}
        >
          {getInitials(employeeName)}
        </div>
      ) : (
        ec && (
          <div
            className={clsx("h-1.5 w-1.5 shrink-0 rounded-full", ec.dotClass)}
          />
        )
      )}
      <span className="truncate">{calendarEvent.title}</span>
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
    employeeName?: string | null;
    [key: string]: unknown;
  };
  hasStartDate: boolean;
  onDelete?: (eventId: string) => void;
};
