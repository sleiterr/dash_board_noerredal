// components/Calendar/CustomEventModal.tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useCalendar } from "./CalendarContext";
import { deleteTaskAction } from "@/app/actions/tasks";
import { formatEventTime } from "@/utils/formatEventTime";

const CustomEventModal = ({ calendarEvent }: { calendarEvent: any }) => {
  const { eventModal, refetchTasks } = useCalendar();

  const handleDelete = async () => {
    await deleteTaskAction(calendarEvent.id);
    await refetchTasks();
    eventModal.close();
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg min-w-70">
      <div className="flex gap-3 items-center justify-end">
        <button className="flex items-center gap-1 text-xs">
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 text-xs text-red-600 cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
      </div>
      <div className="">
        <h4 className="font-semibold text-base">{calendarEvent.title}</h4>
        <p className="text-sm text-quaternary mt-1">
          {calendarEvent.employeeName ?? "Unassigned"}
        </p>
        <span className="text-sm text-quaternary">
          {formatEventTime(calendarEvent.start, calendarEvent.end)}
        </span>
      </div>
    </div>
  );
};

export default CustomEventModal;
