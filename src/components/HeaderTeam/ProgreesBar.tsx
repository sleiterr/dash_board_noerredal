import type { Employee, EmployeeStatus } from "@/lib/types";

const ProgreesBar = ({ counts, total }: ProgressBarProps) => {
  // Calculate the percentage of each status based on the total number of employees
  const percentages = (value: number) =>
    total > 0 ? (value / total) * 100 : 0;

  return (
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
  );
};

export default ProgreesBar;

type ProgressBarProps = {
  counts: Record<EmployeeStatus, number>;
  total: number;
};
