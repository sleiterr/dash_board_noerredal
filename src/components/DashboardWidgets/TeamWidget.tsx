import type { Employee } from "@/lib/types";
import ActiveEmployeesBadge from "@/components/DashboardWidgets/ActiveEmployeesBadge";
import EmployeeToggleList from "@/components/DashboardWidgets/EmployeeToggleList";

const TeamWidget = ({ employees }: TeamWidgetProps) => {
  return (
    <div className="bg-sidebar-bg-calendar p-4 rounded-[14px] shadow-sm w-full">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm text-quinary">Team</h4>
        {/* totalCount={employees.length */}
        <ActiveEmployeesBadge totalCount={employees.length} />
      </div>
      <EmployeeToggleList employees={employees} />
    </div>
  );
};

export default TeamWidget;

type TeamWidgetProps = {
  employees: Employee[];
};
