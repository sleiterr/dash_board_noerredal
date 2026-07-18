"use client";

import clsx from "clsx";
import { EVENT_COLOR_DATA, getInitials } from "@/lib/eventColors";
import type { EventColor } from "@/lib/types";
import { formatEventTime } from "@/utils/formatEventTime";

const CalendarEventTile = ({
  calendarEvent,
  hasStartDate = true,
  variant = "month",
}: CalendarEventTileProps) => {
  const color = calendarEvent.employeeColor;
  const ec = color ? EVENT_COLOR_DATA[color] : null;
  const employeeName = calendarEvent.employeeName;
  const isWeekVariant = variant === "week";

  const durationMinutes =
    isWeekVariant && calendarEvent.start && calendarEvent.end
      ? calendarEvent.start.until(calendarEvent.end).total({ unit: "minutes" }) // Calculate duration in minutes
      : null;

  const isCompact = durationMinutes !== null && durationMinutes < 20;
  const showTime = !isCompact;

  return (
    <div
      title={
        employeeName
          ? `${calendarEvent.title} - ${employeeName}`
          : calendarEvent.title
      }
      style={
        isWeekVariant && ec
          ? {
              borderLeftWidth: 3,
              borderLeftStyle: "solid",
              borderLeftColor: ec.accentColor,
            }
          : undefined
      }
      className={clsx(
        "text-xs font-medium cursor-pointer",
        ec ? [ec.bgClass, ec.textClass] : "bg-zinc-200 text-zinc-700",
        !hasStartDate && "opacity-70",
        !isWeekVariant &&
          "w-full truncate rounded-md px-1.5 py-0.5 flex items-center gap-1 transition-opacity duration-150",
        isWeekVariant &&
          clsx(
            "h-full w-full rounded-r-lg overflow-hidden transition-shadow hover:shadow-md flex",
            isCompact ? "items-center px-2 py-0" : "flex-col gap-0.5 px-2 py-1",
          ),
      )}
    >
      <div className={clsx("flex items-center gap-1.5")}>
        {employeeName && !isCompact ? (
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
        <span className={clsx("truncate", isWeekVariant && "font-semibold")}>
          {calendarEvent.title}
        </span>
      </div>

      {showTime && calendarEvent.start && calendarEvent.end && (
        <span className="truncate text-[10px] opacity-70">
          {formatEventTime(calendarEvent.start, calendarEvent.end)}
        </span>
      )}
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
    start?: any;
    end?: any;
    [key: string]: unknown;
  };
  hasStartDate?: boolean;
  variant?: "month" | "week";
};
