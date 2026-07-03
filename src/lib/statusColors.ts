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
    bgClass: "bg-[#ECFCCA]",
    textClass: "text-[#3C6300]",
    dotClass: "bg-[#3C6300]",
  },
  absent: {
    bgClass: "bg-[#FFE4E6]",
    textClass: "text-[#A50036]",
    dotClass: "bg-[#A50036]",
  },
  late: {
    bgClass: "bg-[#FEF3C6]",
    textClass: "text-[#973C00]",
    dotClass: "bg-[#973C00]",
  },
  sick: {
    bgClass: "bg-[#DFF2FE]",
    textClass: "text-[#00598A]",
    dotClass: "bg-[#00598A]",
  },
};

export const INACTIVE_STATUS_COLORS = {
  bgClass: "bg-[#F7F3EC]",
  textClass: "text-[#A89B7A]",
};
