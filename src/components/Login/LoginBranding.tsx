import LoginPitch from "@/components/Login/LoginPitch";
import { Leaf } from "lucide-react";

export default function LoginBranding() {
  return (
    <div className="hidden lg:flex flex-col justify-between w-105 shrink-0 p-10 sidebar-gradient min-h-screen">
      <div className="flex items-center gap-3">
        <div className="size-10 bg-white/15 rounded-xl flex items-center justify-center">
          <Leaf className="size-5 text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          TeamsDash
        </span>
      </div>

      <div>
        <LoginPitch />
      </div>

      <p className="text-white/30 text-xs">
        © {new Date().getFullYear()} TeamsDash. All rights reserved.
      </p>
    </div>
  );
}
