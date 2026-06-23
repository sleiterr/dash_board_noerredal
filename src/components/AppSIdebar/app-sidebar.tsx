"use client";
import { useState } from "react";
import clsx from "clsx";
import SidebarMenuItems from "@/components/AppSIdebar/sidebar-menu-items";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { LayoutDashboard, PanelLeft } from "lucide-react";

export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const [pinned, setPinned] = useState(false);

  // const isCollapsed = !open;

  return (
    <Sidebar
      className="bg-sidebar pt-4! pb-4!"
      onMouseEnter={() => {
        if (!pinned) {
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (!pinned) {
          setOpen(false);
        }
      }}
      collapsible="icon"
    >
      <SidebarHeader className={clsx("pb-3!", open ? "px-4!" : "px-3!")}>
        <div
          className={clsx(
            "flex items-center gap-4",
            open ? "justify-between" : "justify-none",
          )}
        >
          <div className="size-10 shrink-0 bg-icon-bg rounded-[14px] shadow-md flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-secondary" />
          </div>
          {open && (
            <p className="font-bold text-lg text-secondary tracking-wide">
              Nørredal
            </p>
          )}
          <button
            onClick={() => {
              setPinned((prev) => !prev);
            }}
          >
            <PanelLeft
              className={clsx(
                "cursor-pointer",
                open
                  ? "text-secondary bg-icon-bg shadow-md rounded-full size-10 p-2"
                  : "w-6 h-6 text-sidebar",
              )}
            />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarGroup className={clsx("pb-3!", open ? "px-4!" : "px-2!")}>
          <SidebarGroupContent>
            <SidebarMenu
              className={clsx(
                open ? "flex flex-col gap-4" : "items-center gap-6",
              )}
            >
              <SidebarMenuItems open={open} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-footer-border p-0! pt-4! mx-4!">
        <div
          className={clsx(
            "flex items-center",
            open ? "gap-4" : "justify-center",
          )}
        >
          <div
            className={clsx(
              "size-10 shrink-0 bg-icon-bg rounded-full shadow-md flex items-center justify-center",
            )}
          ></div>
          {open && (
            <h4 className="font-medium text-lg text-footer">My Profile</h4>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
