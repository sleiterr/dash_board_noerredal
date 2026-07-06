import type { Employee, EmployeeStatus } from "@/lib/types";

const ProgreesBar = ({ counts, total }: ProgressBarProps) => {
  // Calculate the percentage of each status based on the total number of employees
  const percentages = (value: number) =>
    total > 0 ? (value / total) * 100 : 0;
  const onSiteCount = counts.present + counts.late;

  return (
    <div className="">
      <div className="mt-3 h-1.5 rounded-full overflow-hidden flex">
        <div
          className="bg-lime-400 h-full transition-all duration-500"
          style={{ width: `${percentages(counts.present)}%` }}
        />
        <div
          className="bg-amber-400 h-full transition-all duration-500"
          style={{ width: `${percentages(counts.late)}%` }}
        />
        <div
          className="bg-sky-400 h-full transition-all duration-500"
          style={{ width: `${percentages(counts.sick)}%` }}
        />
        <div
          className="bg-rose-400 h-full transition-all duration-500"
          style={{ width: `${percentages(counts.absent)}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-normal text-quaternary text-[10px]">
          {onSiteCount} / {total} on site
        </span>
        <span className="font-normal text-quaternary text-[10px]">
          {Math.round(percentages(onSiteCount))}% attendance
        </span>
      </div>
    </div>
  );
};

export default ProgreesBar;

type ProgressBarProps = {
  counts: Record<EmployeeStatus, number>;
  total: number;
};
