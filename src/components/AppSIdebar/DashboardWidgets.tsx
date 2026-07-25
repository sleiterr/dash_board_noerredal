import SidebarCalendar from "@/components/Calendar/sidebar-calendar";
import TeamWidget from "@/components/DashboardWidgets/TeamWidget";
import MyCalendarWidget from "@/components/DashboardWidgets/MyCalendarWidget";
import OtherCalendarWidget from "@/components/DashboardWidgets/OtherCalendarWidget";
import { getEmployees } from "@/utils/api/employees";

const DashboardWidgets = async () => {
  const employees = await getEmployees();

  return (
    <aside className="w-64 shrink-0 flex flex-col items-center gap-4 p-4">
      <SidebarCalendar />
      <TeamWidget employees={employees} />
      <MyCalendarWidget />
      <OtherCalendarWidget />
    </aside>
  );
};

export default DashboardWidgets;
