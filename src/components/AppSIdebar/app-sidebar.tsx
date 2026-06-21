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
      <SidebarHeader className="p-0! pb-3! px-4!">
        <div className="flex items-center gap-4">
          <div className="size-10 shrink-0 bg-icon-bg rounded-[14px] shadow-md flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-secondary" />
          </div>
          {open && (
            <p className="font-bold text-lg text-secondary tracking-wide">
              Noerredal
            </p>
          )}
          <button
            onClick={() => {
              setPinned(!pinned);
              setOpen(true);
            }}
          >
            <PanelLeft />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarGroup className="p-0! py-3! px-4!">
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              <SidebarMenuItems />
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
              "h-10 w-10 rounded-full bg-icon-bg shadow-md flex items-center justify-center",
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
