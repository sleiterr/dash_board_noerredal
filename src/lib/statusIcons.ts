import { CheckCircle, XCircle, Clock, Thermometer } from "lucide-react";
import type { ComponentType } from "react";
import type { EmployeeStatus } from "./types";

export const STATUS_ICONS: Record<
  EmployeeStatus,
  ComponentType<{ className?: string }>
> = {
  present: CheckCircle,
  absent: XCircle,
  late: Clock,
  sick: Thermometer,
};
