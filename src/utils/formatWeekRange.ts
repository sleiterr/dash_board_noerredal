import { startOfWeek, endOfWeek, format, isSameMonth } from "date-fns";

export function formatWeekRange(currentDate: {
  year: number;
  month: number;
  day: number;
}): string {
  // Create a Date object from the currentDate
  const date = new Date(
    currentDate.year,
    currentDate.month - 1,
    currentDate.day,
  );
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday as the first day of the week

  // Format the start and end of the week
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });

  // Format the week range based on whether the start and end are in the same month
  const sameMonth = isSameMonth(weekStart, weekEnd);

  // If the start and end of the week are in the same month, format as "MMM d - d, yyyy"
  if (sameMonth) {
    return `${format(weekStart, "MMM d")} - ${format(weekEnd, "d, yyyy")}`;
  }

  // If the start and end of the week are in different months, format as "MMMM yyyy - MMMM d, yyyy"
  return `${format(weekStart, "MMMM yyyy")} - ${format(weekEnd, "MMMM d, yyyy")}`;
}
