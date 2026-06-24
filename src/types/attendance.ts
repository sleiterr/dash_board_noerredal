export type ViewMode = "daily" | "weekly" | "monthly";

export type AttendanceStatus = "present" | "absent" | "late" | "sick";

// interface for employee attendance data
export interface EmployeeAttendance {
  employeeId: string;
  status: AttendanceStatus;
  note: string;
  checkIn?: string;
}

// interface for attendance data for a specific date
export const STATUS_CONFIG: Record<
  AttendanceStatus,
  {
    label: string;
    bg: string;
    text: string;
    dot: string;
    border: string;
  }
> = {
  present: {
    label: "Present",
    bg: "bg-lime-100",
    text: "text-lime-800",
    dot: "bg-lime-500",
    border: "border-lime-300",
  },
  absent: {
    label: "Absent",
    bg: "bg-rose-100",
    text: "text-rose-800",
    dot: "bg-rose-500",
    border: "border-rose-300",
  },
  late: {
    label: "Late",
    bg: "bg-amber-100",
    text: "text-amber-800",
    dot: "bg-amber-500",
    border: "border-amber-300",
  },
  sick: {
    label: "Sick",
    bg: "bg-sky-100",
    text: "text-sky-800",
    dot: "bg-sky-500",
    border: "border-sky-300",
  },
};

// interface for attendance data for a specific date
export type EventColor = "green" | "purple" | "blue" | "orange" | "rose";

// interface for attendance data for a specific date
export interface Employee {
  id: string;
  name: string;
  initials: string;
  color: EventColor;
  role: string;
}

// mock employee data
export const EMPLOYEES: Employee[] = [
  {
    id: "e1",
    name: "Olena Koval",
    initials: "OK",
    color: "blue",
    role: "Designer",
  },
  {
    id: "e2",
    name: "Dmytro Shevchenko",
    initials: "DS",
    color: "purple",
    role: "Developer",
  },
  {
    id: "e3",
    name: "Sofia Bondar",
    initials: "SB",
    color: "green",
    role: "Manager",
  },
  {
    id: "e4",
    name: "Ivan Petrenko",
    initials: "IP",
    color: "orange",
    role: "Developer",
  },
  {
    id: "e5",
    name: "Marta Lysenko",
    initials: "ML",
    color: "rose",
    role: "Marketing",
  },
];

// interface for calendar event data
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // "yyyy-MM-dd"
  startTime: string; // "HH:MM"
  endTime: string;
  color: EventColor;
  category: string;
  attendees: number;
  employeeId?: string;
}

export const HOUR_HEIGHT = 72;
export const DAY_START = 7;
export const DAY_END = 22;
export const HOURS = Array.from(
  { length: DAY_END - DAY_START },
  (_, i) => DAY_START + i,
);

// interface for event color data
export const EVENT_COLOR_DATA: Record<
  EventColor,
  {
    bgClass: string;
    textClass: string;
    dotClass: string;
    accentColor: string;
    checkClass: string;
    lightBg: string;
    avatarBg: string;
    avatarText: string;
  }
> = {
  green: {
    bgClass: "bg-lime-100",
    textClass: "text-lime-900",
    dotClass: "bg-lime-500",
    accentColor: "#16a34a",
    checkClass: "bg-lime-500",
    lightBg: "bg-lime-50",
    avatarBg: "bg-lime-500",
    avatarText: "text-white",
  },
  purple: {
    bgClass: "bg-farm-200",
    textClass: "text-farm-900",
    dotClass: "bg-farm-300",
    accentColor: "#2D4A35",
    checkClass: "bg-farm-700",
    lightBg: "bg-farm-100",
    avatarBg: "bg-farm-700",
    avatarText: "text-white",
  },
  blue: {
    bgClass: "bg-sky-100",
    textClass: "text-sky-900",
    dotClass: "bg-sky-500",
    accentColor: "#0284c7",
    checkClass: "bg-sky-500",
    lightBg: "bg-sky-50",
    avatarBg: "bg-sky-500",
    avatarText: "text-white",
  },
  orange: {
    bgClass: "bg-orange-100",
    textClass: "text-orange-900",
    dotClass: "bg-orange-500",
    accentColor: "#ea580c",
    checkClass: "bg-orange-500",
    lightBg: "bg-orange-50",
    avatarBg: "bg-orange-500",
    avatarText: "text-white",
  },
  rose: {
    bgClass: "bg-rose-100",
    textClass: "text-rose-900",
    dotClass: "bg-rose-500",
    accentColor: "#e11d48",
    checkClass: "bg-rose-500",
    lightBg: "bg-rose-50",
    avatarBg: "bg-rose-500",
    avatarText: "text-white",
  },
};

// utility functions for time calculations
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// utility function to get the position of an event in the calendar based on its start and end time
export function getEventPosition(startTime: string, endTime: string) {
  const startMins = timeToMinutes(startTime);
  const endMins = timeToMinutes(endTime);
  const dayStartMins = DAY_START * 60;
  const top = ((startMins - dayStartMins) / 60) * HOUR_HEIGHT;
  const height = Math.max(((endMins - startMins) / 60) * HOUR_HEIGHT, 30);
  return { top, height };
}

// utility function to generate a unique ID for an event
export function generateId(): string {
  return `event-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// utility function to format hour in 12-hour format with AM/PM
export function formatHour(h: number): string {
  if (h === 0 || h === 24) return "12 AM";
  if (h === 12) return "12 PM";
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}
