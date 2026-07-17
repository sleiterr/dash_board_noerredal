// components/Calendar/CustomEventModal.tsx
"use client";

import { useState } from "react";
import { useCalendar } from "./CalendarContext";

import { deleteTaskAction } from "@/app/actions/tasks";
import { formatEventTime } from "@/utils/formatEventTime";

import { toast } from "sonner";
import ConfirmEventDelete from "./ConfirmEventDelete";
import EventBtn from "./EventBtn";
import ModalNewEvent from "@/components/Header/ModalNewEvent";

const CustomEventModal = ({ calendarEvent }: CustomEventModalProps) => {
  const { eventModal, refetchTasks } = useCalendar();
  const [islOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTaskAction(calendarEvent.id);
      await refetchTasks();
      toast.success(`Event "${calendarEvent.title}" deleted successfully.`);
    } catch {
      toast.error("Failed to delete the event.");
    } finally {
      eventModal.close();
      setIsOpen(false);
    }
  };

  if (isEditing) {
    return (
      <ModalNewEvent
        task={calendarEvent}
        onClose={() => {
          setIsEditing(false);
          eventModal.close();
        }}
      />
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg min-w-70">
      <div className="flex gap-3 items-center justify-end">
        <EventBtn
          setIsOpen={setIsOpen}
          onEditClick={() => setIsEditing(true)}
        />
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
      {islOpen && (
        <ConfirmEventDelete
          eventTitle={calendarEvent.title}
          onConfirm={handleDelete}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CustomEventModal;

type CustomEventModalProps = {
  calendarEvent: {
    id: string;
    title: string;
    employeeName?: string | null;
    employeeId?: string | null;
    start: Temporal.ZonedDateTime;
    end: Temporal.ZonedDateTime;
    [key: string]: unknown;
  };
};
