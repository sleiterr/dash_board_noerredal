const weekdays = [
  { id: 1, label: "Mon" },
  { id: 2, label: "Tue" },
  { id: 3, label: "Wed" },
  { id: 4, label: "Thu" },
  { id: 5, label: "Fri" },
  { id: 6, label: "Sat" },
  { id: 7, label: "Sun" },
];

const CalendarWeekdays = () => {
  return (
    <div className="calendar-weekdays border-t border-header-border">
      {weekdays.map(({ id, label }) => (
        <span key={id} className="font-medium text-center text-xs text-senary">
          {label}
        </span>
      ))}
    </div>
  );
};

export default CalendarWeekdays;
