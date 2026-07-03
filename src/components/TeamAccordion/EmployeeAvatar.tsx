import { EVENT_COLOR_DATA, getInitials } from "@/lib/eventColors";
import { STATUS_COLOR_DATA } from "@/lib/statusColors";
import type { Employee } from "@/lib/types";
import { cn } from "@/lib/utils";

const EmployeeAvatar = ({ employee }: { employee: Employee }) => {
  const colors = EVENT_COLOR_DATA[employee.color];
  const statusColors = STATUS_COLOR_DATA[employee.status];

  return (
    <div className="relative shrink-0">
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold shadow-sm",
          colors.avatarBg,
          colors.avatarText,
        )}
      >
        {getInitials(employee.fullName)}
      </div>
      <div
        className={cn(
          "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white",
          statusColors.bgClass,
        )}
      >
        <div className={cn("h-2 w-2 rounded-full", statusColors.dotClass)} />
      </div>
    </div>
  );
};

export default EmployeeAvatar;
