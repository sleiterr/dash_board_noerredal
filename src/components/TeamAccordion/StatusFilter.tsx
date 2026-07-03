"use client";

import { STATUS_ICONS } from "@/lib/statusIcons";
import {
  STATUS_LIST,
  STATUS_LABELS,
  STATUS_COLOR_DATA,
  INACTIVE_STATUS_COLORS,
} from "@/lib/statusColors";
import { setEmployeeStatusAction } from "@/app/actions/employees";
import type { Employee, EmployeeStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const StatusFilter = ({ employee }: { employee: Employee }) => {
  const handleClick = (e: React.MouseEvent, status: EmployeeStatus) => {
    // stopPropagation prevents the click event from bubbling up to the parent elements, which would cause the accordion to toggle open/close when clicking on a status button.
    e.stopPropagation();
    setEmployeeStatusAction(employee.id, status); // Cast to any to avoid type error
  };
  return (
    <div className="flex gap-2">
      {STATUS_LIST.map((status) => {
        // Check if the current status is active for the employee
        const isActive = employee.status === status;
        // Get the appropriate colors based on whether the status is active or inactive
        const colors = isActive
          ? STATUS_COLOR_DATA[status]
          : INACTIVE_STATUS_COLORS;
        // Get the appropriate icon for the status
        const Icon = STATUS_ICONS[status];

        return (
          <button
            key={status}
            onClick={(e) => handleClick(e, status)}
            className={cn(
              "flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer",
              colors.bgClass,
              colors.textClass,
              isActive && "shadow",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {STATUS_LABELS[status]}
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilter;
