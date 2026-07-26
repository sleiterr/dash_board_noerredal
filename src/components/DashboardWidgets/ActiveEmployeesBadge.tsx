"use client";

import { useCalendar } from "@/components/Calendar/CalendarContext";

const ActiveEmployeesBadge = ({ totalCount }: { totalCount: number }) => {
  const { hiddenEmployeeIds } = useCalendar();
  const activeCount = totalCount - hiddenEmployeeIds.size;

  return (
    <>
      <span className="font-medium text-[10px] text-quaternary bg-event-stats-bg px-1.5 py-0.5 rounded-full">
        {activeCount} active
      </span>
    </>
  );
};

export default ActiveEmployeesBadge;
