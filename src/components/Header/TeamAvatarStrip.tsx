import { EVENT_COLOR_DATA, getInitials } from "@/lib/eventColors";
import type { Employee } from "@/lib/types";

const TeamAvatarStrip = ({ employees }: TeamAvatarStripProps) => {
  const activeEmployees = employees.filter((e) => e.status === "present");

  return (
    <div className="hidden md:flex items-center">
      {activeEmployees.map((emp, i) => {
        const colors = EVENT_COLOR_DATA[emp.color];
        return (
          <div
            key={emp.id}
            title={emp.fullName}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm ${colors.avatarBg} ${colors.avatarText}`}
            style={{ marginLeft: i === 0 ? 0 : -8 }}
          >
            {getInitials(emp.fullName)}
          </div>
        );
      })}
      <span className="ml-2 text-xs text-farm-500 dark:text-[#6B8070] font-medium">
        {activeEmployees.length} shown
      </span>
    </div>
  );
};

export default TeamAvatarStrip;

type TeamAvatarStripProps = {
  employees: Employee[];
};
