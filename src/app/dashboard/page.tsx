import DashboardWidgets from "@/components/AppSIdebar/DashboardWidgets";
import DashboardCalendar from "@/components/Calendar/dashboard-calendar";

export default function DashboardPage() {
  return (
    <div className="flex h-full">
      <DashboardWidgets />
      <DashboardCalendar />
    </div>
  );
}
