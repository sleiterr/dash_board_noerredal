import CalendarProvider from "@/components/Calendar/CalendarProvider";
import DashboardWidgets from "@/components/AppSIdebar/DashboardWidgets";
import CalendarDashboard from "@/components/Calendar/CalendarDashboard";
import Header from "@/components/Header/Header";

export default function DashboardPage() {
  return (
    <CalendarProvider>
      <div className="flex h-full">
        <DashboardWidgets />
        <div className="flex flex-1 flex-col">
          <Header />
          <CalendarDashboard />
        </div>
      </div>
    </CalendarProvider>
  );
}
