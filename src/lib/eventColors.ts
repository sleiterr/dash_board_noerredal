export type EventColor = "green" | "purple" | "blue" | "orange" | "rose";

export const COLORS: EventColor[] = [
  "green",
  "purple",
  "blue",
  "orange",
  "rose",
];

export const COLOR_LABELS: Record<EventColor, string> = {
  green: "Green",
  purple: "Purple",
  blue: "Blue",
  orange: "Orange",
  rose: "Rose",
};

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
    bgClass: "bg-violet-200",
    textClass: "text-violet-900",
    dotClass: "bg-violet-300",
    accentColor: "#7c3aed",
    checkClass: "bg-violet-700",
    lightBg: "bg-violet-100",
    avatarBg: "bg-violet-700",
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

export function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) || "?"
  );
}
