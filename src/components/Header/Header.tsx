import { Bell, Plus, CalendarDays } from "lucide-react";
import CalendarViewSwitcher from "./CalendarViewSwitcher";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-header-bg border-b border-header-border">
      <div className="flex items-center gap-2">
        <div className="size-10 shrink-0 bg-sidebar rounded-full shadow-md flex items-center justify-center">
          <CalendarDays className="h-5 w-5 text-secondary" />
        </div>
        <p className="font-bold text-sm text-quinary tracking-wide">Nørredal</p>
      </div>
      <div className="">
        <CalendarViewSwitcher />
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-muted">
          <Bell className="h-4 w-4" />
        </button>

        <button className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-white">
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>
    </header>
  );
};

export default Header;
