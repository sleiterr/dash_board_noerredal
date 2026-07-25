import type { Employee } from "@/lib/types";
import { STATUS_LABELS, STATUS_COLOR_DATA } from "@/lib/statusColors";

const EmployeeStatusBadge = ({ status }: EmployeeStatusBadgeProps) => {
  const colors = STATUS_COLOR_DATA[status];

  return (
    <div
      className={`flex items-center gap-1 shrink-0 px-1.5 py-0.5 rounded-full ${colors.bgClass}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${colors.dotClass}`} />

      <span className={`font-medium text-[9px] ${colors.textClass}`}>
        {STATUS_LABELS[status]}
      </span>
    </div>
  );
};

export default EmployeeStatusBadge;

type EmployeeStatusBadgeProps = {
  status: Employee["status"];
};
