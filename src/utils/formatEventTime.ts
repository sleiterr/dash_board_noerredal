import "temporal-polyfill/global";

export function formatEventTime(
  start: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime,
): string {
  // Format the event time in a human-readable format, e.g., "12. jan · 14:00–15:00"
  const dateStr = start.toPlainDate().toLocaleString("da-DK", {
    day: "numeric",
    month: "short",
  });

  // Format the start and end times in 24-hour format (HH:mm)
  const startTime = start.toPlainTime().toString().slice(0, 5);
  const endTime = end.toPlainTime().toString().slice(0, 5);

  return `${dateStr} · ${startTime}–${endTime}`;
}
