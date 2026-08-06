import { LogOut } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

const ProfileFooter = ({ open }: { open: boolean }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
  };
  return (
    <div
      className={clsx(
        "flex items-center",
        open ? "justify-between gap-4" : "justify-center",
      )}
    >
      <div
        className={clsx("flex items-center", open ? "gap-4" : "justify-center")}
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

      {open && (
        <button
          onClick={handleLogout}
          className="text-tertiary hover:text-secondary transition-colors cursor-pointer"
        >
          <LogOut className="size-5" />
        </button>
      )}
    </div>
  );
};

export default ProfileFooter;
