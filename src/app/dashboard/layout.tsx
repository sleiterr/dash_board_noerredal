import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSIdebar/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
