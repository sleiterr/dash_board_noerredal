import type { Employee } from "@/lib/types";
import { getEmployeeStatusCounts } from "@/utils/api/employees";

import ActiveEmployeesBadge from "@/components/DashboardWidgets/ActiveEmployeesBadge";
import EmployeeToggleList from "@/components/DashboardWidgets/EmployeeToggleList";
import StatusSummaryChips from "@/components/HeaderTeam/StatusSummaryChips";

const TeamWidget = ({ employees }: TeamWidgetProps) => {
  const counts = getEmployeeStatusCounts(employees);

  return (
    <div className="flex flex-col bg-sidebar-bg-calendar p-4 rounded-[14px] shadow-sm w-full">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-quinary">Team</h4>
          {/* totalCount={employees.length */}
          <ActiveEmployeesBadge totalCount={employees.length} />
        </div>
        <div className="flex-1 overflow-y-auto h-57.5 my-4">
          <EmployeeToggleList employees={employees} />
        </div>
      </div>
      <div className="border-t border-accordion-border">
        <StatusSummaryChips counts={counts} variant="widget" />
      </div>
    </div>
  );
};

export default TeamWidget;

type TeamWidgetProps = {
  employees: Employee[];
};
