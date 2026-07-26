"use client";

import { EVENT_COLOR_DATA, getInitials } from "@/lib/eventColors";
import type { Employee } from "@/lib/types";
import { useCalendar } from "@/components/Calendar/CalendarContext";
import EmployeeNameLocation from "@/components/DashboardWidgets/EmployeeNameLocation";
import EmployeeStatusBadge from "./EmployeeStatusBadge";
import { cn } from "@/lib/utils";

const EmployeeToggleList = ({ employees }: EmployeeToggleListProps) => {
  const { hiddenEmployeeIds, toggleEmployeeVisibility } = useCalendar();

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {employees.map((emp) => {
        const colors = EVENT_COLOR_DATA[emp.color];
        const isActive = !hiddenEmployeeIds.has(emp.id);

        return (
          <button
            key={emp.id}
            onClick={() => toggleEmployeeVisibility(emp.id)}
            className={cn(
              "flex w-full items-center gap-2.5 px-2 py-1.5 rounded-lg transition-all text-left  cursor-pointer",
              isActive
                ? "bg-team-list hover:bg-hover-team-list"
                : "opacity-40 hover:opacity-70 hover:bg-gray-50",
            )}
          >
            <div
              title={emp.fullName}
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold shadow-sm",
                colors.avatarBg,
                colors.avatarText,
              )}
            >
              {getInitials(emp.fullName)}
            </div>
            <EmployeeNameLocation employee={emp} />
            <EmployeeStatusBadge status={emp.status} />
          </button>
        );
      })}
    </div>
  );
};

export default EmployeeToggleList;

type EmployeeToggleListProps = {
  employees: Employee[];
};
