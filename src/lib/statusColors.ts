// statusColors.ts

import type { EmployeeStatus } from "./types";

export const STATUS_LIST: EmployeeStatus[] = [
  "present",
  "absent",
  "late",
  "sick",
];

export const STATUS_LABELS: Record<EmployeeStatus, string> = {
  present: "Present",
  absent: "Absent",
  late: "Late",
  sick: "Sick",
};

export const STATUS_COLOR_DATA: Record<
  EmployeeStatus,
  {
    bgClass: string;
    textClass: string;
    dotClass: string;
  }
> = {
  present: {
    bgClass: "bg-green-100",
    textClass: "text-green-700",
    dotClass: "bg-green-500",
  },
  absent: {
    bgClass: "bg-gray-100",
    textClass: "text-gray-700",
    dotClass: "bg-gray-400",
  },
  late: {
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-700",
    dotClass: "bg-yellow-500",
  },
  sick: {
    bgClass: "bg-red-100",
    textClass: "text-red-700",
    dotClass: "bg-red-500",
  },
};
