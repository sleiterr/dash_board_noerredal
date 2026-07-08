"use client";
import { useState } from "react";
import clsx from "clsx";
import { Bell, Plus, CalendarDays } from "lucide-react";
import CalendarViewSwitcher from "./CalendarViewSwitcher";
import ModalNewEvent from "./ModalNewEvent";
import EventStats from "./EventStats";
import TeamAvatarStrip from "./TeamAvatarStrip";
import { Employee } from "@/lib/types";

const Header = ({ employees }: HeaderProps) => {
  const [islOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-header-bg border-b border-header-border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="size-10 shrink-0 bg-sidebar rounded-full shadow-md flex items-center justify-center">
            <CalendarDays className="h-5 w-5 text-secondary" />
          </div>
          <p className="font-bold text-sm text-quinary tracking-wide">
            TeamsDash
          </p>
        </div>
        <CalendarViewSwitcher />
      </div>

      <div className="flex items-center gap-3">
        <div className="">
          <TeamAvatarStrip employees={employees} />
        </div>
        <div className="w-px h-6 bg-strip" />
        <div className="">
          <EventStats />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-muted">
            <Bell className="h-4 w-4 text-calendar-icon" />
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className={clsx(
              "font-normal text-xs text-white",
              "flex items-center gap-2 px-4 py-2 rounded-full shadow-md bg-cta-modal cursor-pointer",
              "hover:bg-cta-modal-hover transition-all duration-300",
            )}
          >
            <Plus className="h-4 w-4 text-white" />
            Add Event
          </button>
        </div>
      </div>
      {islOpen && <ModalNewEvent onClose={() => setIsOpen(false)} />}
    </header>
  );
};

export default Header;

type HeaderProps = {
  employees: Employee[];
};
