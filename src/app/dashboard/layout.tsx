import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSIdebar/app-sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 flex-col overflow-hidden">{children}</main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
