import { Leaf } from "lucide-react";

const FEATURES = [
  "Team Attendance",
  "Task Calendar",
  "Dark Mode",
  "Real-time Sync",
];

export default function LoginBranding() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10 sidebar-gradient min-h-screen">
      <div className="flex items-center gap-3">
        <div className="size-10 bg-white/15 rounded-xl flex items-center justify-center">
          <Leaf className="size-5 text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          TeamsDash
        </span>
      </div>

      <div>
        <h4 className="text-white text-3xl font-bold leading-snug mb-4">
          Manage your team
          <br />& schedule
        </h4>
        <p className="text-white/60 text-sm leading-relaxed">
          Track attendance, assign tasks, and keep your team organised — all in
          one place.
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {FEATURES.map((f) => (
            <span
              key={f}
              className="text-[11px] px-3 py-1 rounded-full bg-white/10 text-white/70"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <p className="text-white/30 text-xs">
        © {new Date().getFullYear()} TeamsDash. All rights reserved.
      </p>
    </div>
  );
}
