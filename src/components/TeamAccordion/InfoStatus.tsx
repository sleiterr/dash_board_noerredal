import { STATUS_LABELS, STATUS_COLOR_DATA } from "@/lib/statusColors";
import type { Employee } from "@/lib/types";
import { STATUS_ICONS } from "@/lib/statusIcons";
import { cn } from "@/lib/utils";

const InfoStatus = ({ employee }: { employee: Employee }) => {
  const colors = STATUS_COLOR_DATA[employee.status];
  const Icon = STATUS_ICONS[employee.status];

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs",
          colors.bgClass,
          colors.textClass,
        )}
      >
        <Icon className="h-3.5 w-3.5" />
        {STATUS_LABELS[employee.status]}
      </span>
    </div>
  );
};

export default InfoStatus;
