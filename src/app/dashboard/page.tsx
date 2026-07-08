import CalendarProvider from "@/components/Calendar/CalendarProvider";
import DashboardWidgets from "@/components/AppSIdebar/DashboardWidgets";
import CalendarDashboard from "@/components/Calendar/CalendarDashboard";
import Header from "@/components/Header/Header";

import { getEmployees } from "@/utils/api/employees";

export default async function DashboardPage() {
  const employees = await getEmployees();

  return (
    <CalendarProvider>
      <div className="flex h-full">
        <DashboardWidgets />
        <div className="flex flex-1 flex-col">
          <Header employees={employees} />
          <CalendarDashboard />
        </div>
      </div>
    </CalendarProvider>
  );
}
