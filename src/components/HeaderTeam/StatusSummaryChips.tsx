import {
  STATUS_LIST,
  STATUS_LABELS,
  STATUS_COLOR_DATA,
} from "@/lib/statusColors";
import type { EmployeeStatus } from "@/lib/types";

const StatusSummaryChips = ({ counts }: StatusSummaryChipsProps) => {
  return (
    <div className="flex items-center gap-2">
      {STATUS_LIST.map((status) => {
        const colors = STATUS_COLOR_DATA[status];
        return (
          <div
            key={status}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${colors.bgClass}`}
          >
            <div className={`w-2 h-2 rounded-full ${colors.dotClass}`} />
            <span className={`text-xs font-semibold ${colors.textClass}`}>
              {counts[status]}
            </span>
            <span className={`text-xs ${colors.textClass} opacity-70`}>
              {STATUS_LABELS[status]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusSummaryChips;

type StatusSummaryChipsProps = {
  counts: Record<EmployeeStatus, number>;
};
