"use client";

import { Plus } from "lucide-react";
import { useCalendar } from "./CalendarContext";

type Props = { date: number; jsDate: Date };

// Rendered inside .sx__month-grid-day__header-date (24px circle, no position:relative)
// Absolute-positioned button escapes to nearest positioned ancestor: .sx__month-grid-day__header
export default function MonthGridDateCell({ date }: Props) {
  const { openNewEventModal } = useCalendar();

  return (
    <>
      {date}
      <button
        onClick={(e) => {
          e.stopPropagation();
          openNewEventModal();
        }}
        aria-label="Add event"
        className="month-grid-add-btn absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-5 h-5 rounded-full text-input-focus hover:bg-cta-link hover:text-white transition-colors duration-150"
      >
        <Plus className="font-bold w-4 h-4 cursor-pointer" strokeWidth={2.5} />
      </button>
    </>
  );
}
