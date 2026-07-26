import {
  STATUS_LIST,
  STATUS_LABELS,
  STATUS_COLOR_DATA,
} from "@/lib/statusColors";
import type { EmployeeStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const StatusSummaryChips = ({ counts, variant }: StatusSummaryChipsProps) => {
  // isWifget is true if the variant prop is "widget", otherwise false
  const isWidget = variant === "widget";
  // Filter the STATUS_LIST to exclude "sick" if isWidget is true, otherwise use the full list
  const statusesToShow = isWidget
    ? STATUS_LIST.filter((status) => status !== "sick")
    : STATUS_LIST;

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        isWidget && "items-start w-full gap-2 pt-4",
      )}
    >
      {statusesToShow.map((status) => {
        const colors = STATUS_COLOR_DATA[status];
        return (
          <div
            key={status}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl",
              !isWidget && colors.bgClass,
              isWidget && "gap-1 px-0 py-0",
            )}
          >
            <div className={`w-2 h-2 rounded-full ${colors.dotClass}`} />

            <span
              className={cn(
                "font-semibold",
                !isWidget && cn("text-xs", colors.textClass),
                isWidget && "font-normal text-[10px] text-widget-role",
              )}
            >
              {counts[status]}
            </span>
            <span
              className={cn(
                "opacity-70 font-normal",
                !isWidget && cn("text-xs ", colors.textClass),
                isWidget && "text-[10px] text-widget-role",
              )}
            >
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
  variant?: "header" | "widget";
};
