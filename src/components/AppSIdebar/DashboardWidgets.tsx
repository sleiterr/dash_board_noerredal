import SidebarCalendar from "@/components/Calendar/sidebar-calendar";

const DashboardWidgets = () => {
  return (
    <aside className="w-64 shrink-0 flex flex-col items-center p-4">
      <SidebarCalendar />
    </aside>
  );
};

export default DashboardWidgets;
