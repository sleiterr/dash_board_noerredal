import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { House, Calendar, Users, Settings } from "lucide-react";

const items = [
  {
    title: "Home",
    href: "/dashboard",
    classTitle:
      "font-medium text-xl text-tertiary group-hove/sidebar::text-secondary transition-colors duration-300",
    icon: House,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    classTitle:
      "font-medium text-xl text-tertiary group-hove/sidebar::text-secondary transition-colors duration-300",
    icon: Calendar,
  },
  {
    title: "Employees",
    href: "/",
    classTitle:
      "font-medium text-xl text-tertiary group-hove/sidebar::text-secondary transition-colors duration-300",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/",
    classTitle:
      "font-medium text-xl text-tertiary group-hover/sidebar:text-secondary transition-colors duration-300",
    icon: Settings,
  },
];

const SidebarMenuItems = () => {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title} className="p-0!">
          <SidebarMenuButton
            asChild
            className={cn(
              "group/sidebar rounded-[14px] px-4 py-6 transition-colors",
              "hover:bg-sidebar-hover-link",
              pathname === item.href && "bg-sidebar-hover-link",
            )}
          >
            <Link href={item.href}>
              <item.icon
                className={cn(
                  "text-tertiary transition-colors",
                  "group-hover/sidebar:text-secondary",
                  pathname === item.href && "text-secondary",
                )}
              />

              <span
                className={cn(
                  "font-medium text-xl text-tertiary transition-colors",
                  "group-hover/sidebar:text-secondary",
                  pathname === item.href && "text-secondary",
                )}
              >
                {item.title}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default SidebarMenuItems;
