import type { PersonalTask } from "@/utils/api/personalTask";

// doneCount is the number of tasks that are marked as done, filter for tasks where the done property is true and get the length of that array
const ProgressTaskBar = ({ tasks }: { tasks: PersonalTask[] }) => {
  const doneCount = tasks.filter((t) => t.done).length;

  if (tasks.length === 0) return null; // if there are no tasks, don't render the progress bar

  return (
    <>
      {tasks.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-progress-border text-[10px] text-calendar-subtitle text-center">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-quaternary">Progress</span>
            <span className="text-[9px] text-progress-nr font-medium">
              {doneCount}/{tasks.length}
            </span>
          </div>
          <div className="h-1 bg-progress-bar rounded-full overflow-hidden">
            <div
              className="h-full bg-active-progress rounded-full transition-all"
              style={{ width: `${(doneCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressTaskBar;
