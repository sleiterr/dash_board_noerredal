"use client";

import { Check, X } from "lucide-react";
import { EVENT_COLOR_DATA } from "@/lib/eventColors";
import type { PersonalTask } from "@/utils/api/personalTask";

type PersonalTaskItemProps = {
  task: PersonalTask;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onToggle: (task: PersonalTask) => void;
  onDelete: (taskId: string) => void;
};

const PersonalTaskItem = ({
  task,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onToggle,
  onDelete,
}: PersonalTaskItemProps) => {
  const colors = EVENT_COLOR_DATA[task.color];

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <button
        onClick={() => onToggle(task)}
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
          task.done
            ? `${colors.checkClass} border-transparent`
            : "border-done bg-white hover:border-done-hover"
        }`}
      >
        {task.done && <Check className="w-2 h-2 text-white" />}
      </button>

      <span
        className={`text-xs flex-1 min-w-0 ${
          task.done ? "line-through text-done" : "text-calendar-active"
        }`}
      >
        {task.label}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className={`shrink-0 w-4 h-4 flex items-center justify-center text-calendar-subtitle hover:text-red-400 transition-all cursor-pointer ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        title="Remove"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default PersonalTaskItem;
