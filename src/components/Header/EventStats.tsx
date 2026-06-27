"use client";

import { useEventStats } from "@/hooks/useEventStats";

const EventStats = () => {
  // Fetch event statistics using the custom hook
  const { totalEventsThisWeek, totalEventsToday } = useEventStats();

  return (
    <div className="flex items-center gap-3 border border-border-event-stats rounded-[14px] px-3 py-1.5 bg-event-stats-bg">
      <div className="text-center">
        <div className="font-bold text-xs text-quinary">
          {totalEventsThisWeek}
        </div>
        <div className="font-normal text-quaternary text-xs leading-tight">
          this week
        </div>
      </div>
      <div className="w-px h-6 bg-border-event" />
      <div className="text-center">
        <div className="font-bold text-xs text-quinary">{totalEventsToday}</div>
        <div className="font-normal text-quaternary text-xs leading-tight">
          today
        </div>
      </div>
    </div>
  );
};

export default EventStats;
