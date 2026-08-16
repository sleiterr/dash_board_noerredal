import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { Calendar, Users } from "lucide-react";

const sidebarLinks: MenuLinks[] = [
  {
    title: "Calendar",
    href: "/dashboard",
    classTitle:
      "font-medium text-xl text-tertiary group-hove/sidebar::text-secondary transition-colors duration-300",
    icon: Calendar,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    classTitle:
      "font-medium text-xl text-tertiary group-hove/sidebar::text-secondary transition-colors duration-300",
    icon: Users,
  },
];

const SidebarMenuItems = ({ open }: { open: boolean }) => {
  const pathname = usePathname();
  return (
    <>
      {sidebarLinks.map((item) => (
        <SidebarMenuItem key={item.title} className="p-0!">
          <SidebarMenuButton
            asChild
            className={cn(
              "group/sidebar transition-colors",
              open ? "rounded-[14px] py-6 px-4" : "px-0! justify-center",
              "hover:bg-sidebar-hover-link",
              pathname === item.href && "bg-sidebar-hover-link",
              !open &&
                pathname === item.href &&
                "size-12! p-12! mx-auto rounded-full",
            )}
          >
            <Link
              href={item.href}
              className={cn(
                "flex items-center w-full",
                !open && "justify-center",
              )}
            >
              <item.icon
                className={cn(
                  "text-tertiary transition-all",
                  open ? "size-5!" : "size-6!",
                  "group-hover/sidebar:text-secondary",
                  pathname === item.href && "text-secondary",
                )}
              />

              {open && (
                <span
                  className={cn(
                    "font-medium text-xl text-tertiary transition-colors",
                    "group-hover/sidebar:text-secondary",
                    pathname === item.href && "text-secondary",
                  )}
                >
                  {item.title}
                </span>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default SidebarMenuItems;

type MenuLinks = {
  title: string;
  href: string;
  classTitle: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
