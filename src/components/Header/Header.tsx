import { Bell, Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-header-border px-5 py-3 bg-header-bg">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">Calendar</h1>
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
