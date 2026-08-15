"use client";

import { useEffect, useState } from "react";
import CtaCalendar from "./CtaCalendar";
import ModalNewTask from "./ModalNewTask";

import {
  getPersonalTasks,
  toggleTaskDone,
  deletePersonalTask,
} from "@/utils/api/personalTask";
import type { PersonalTask } from "@/utils/api/personalTask";

import ProgressTaskBar from "./ProgressTaskBar";
import PersonalTaskList from "./PersonalTaskList";

const MyCalendarWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<PersonalTask[]>([]);

  // useEffect to fetch personal tasks when the component mounts
  useEffect(() => {
    getPersonalTasks().then(setTasks).catch(console.error);
  }, []);

  // handle adding a new personal task
  const handleToggle = async (task: PersonalTask) => {
    await toggleTaskDone(task.id, !task.done);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
    );
  };

  // handle deleting a personal task
  const handleDelete = async (taskId: string) => {
    await deletePersonalTask(taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return (
    <div className="bg-sidebar-bg-calendar p-4 rounded-[14px] shadow-sm w-full">
      <div className="flex justify-between items-center">
        <div className="">
          <h4>My Calendar</h4>
          <p className="font-normal text-[9px] text-calendar-subtitle leading-tight">
            Personal tasks
          </p>
        </div>
        <CtaCalendar setIsOpen={setIsOpen} />
      </div>
      {tasks.length === 0 && (
        <p className="font-normal text-[10px] text-widget-msg text-center py-2">
          No tasks yet - press to add one
        </p>
      )}

      <PersonalTaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      <ProgressTaskBar tasks={tasks} />
      {isOpen && (
        <ModalNewTask
          onClose={() => setIsOpen(false)}
          onSuccess={() =>
            getPersonalTasks().then(setTasks).catch(console.error)
          }
        />
      )}
    </div>
  );
};

export default MyCalendarWidget;
