import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Calendar, Users, LayoutDashboard } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Calendar",
    icon: Calendar,
  },
  {
    title: "Employees",
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-sidebar py-4 px-2">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-md bg-primary" />

          <span className="text-lg font-bold text-primary">Noerredal Farm</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <item.icon className="text-primary" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <h4>Footer</h4>
      </SidebarFooter>
    </Sidebar>
  );
}
