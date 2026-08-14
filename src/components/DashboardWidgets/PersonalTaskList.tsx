"use client";

import { useState } from "react";
import PersonalTaskItem from "./PersonalTaskItem";
import type { PersonalTask } from "@/utils/api/personalTask";

type PersonalTaskListProps = {
  tasks: PersonalTask[];
  onToggle: (task: PersonalTask) => void;
  onDelete: (taskId: string) => void;
};

const PersonalTaskList = ({
  tasks,
  onToggle,
  onDelete,
}: PersonalTaskListProps) => {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  return (
    <div className="mt-4 space-y-2">
      {tasks.map((task) => (
        <PersonalTaskItem
          key={task.id}
          task={task}
          isHovered={hoveredTask === task.id}
          onHoverStart={() => setHoveredTask(task.id)}
          onHoverEnd={() => setHoveredTask(null)}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PersonalTaskList;
