"use client";

import { setEmployeeStatusAction } from "@/app/actions/employees";
import type { Employee, EmployeeStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUSES: EmployeeStatus[] = ["present", "absent", "late", "sick"];

const StatusFilter = ({ employee }: { employee: Employee }) => {
  const handleClick = (e: React.MouseEvent, status: string) => {
    e.stopPropagation();
    setEmployeeStatusAction(employee.id, status as any); // Cast to any to avoid type error
  };
  return (
    <div className="flex gap-2">
      {STATUSES.map((status) => (
        <button
          key={status}
          onClick={(e) => handleClick(e, status)}
          className={cn(
            "rounded-full px-2 py-1 text-xs capitalize",
            employee.status === status
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
