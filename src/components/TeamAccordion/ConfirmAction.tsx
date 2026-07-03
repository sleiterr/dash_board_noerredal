"use client";

import clsx from "clsx";
import { Button } from "@/components/ui/button";

const ConfirmAction = ({ onCancel, onConfirm }: ConfirmActionProps) => {
  return (
    <div className="flex items-center justify-center gap-3 border-t border-header-border pt-4 w-full">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className={clsx(
          "font-medium text-sm text-cta-modal",
          "flex-1 h-10 bg-cta-bg py-2 px-12 rounded-2xl",
          "hover:bg-cta-bg-hover transition-all duration-300 cursor-pointer border-0",
        )}
      >
        Cancel
      </Button>
      <Button
        type="button"
        onClick={onConfirm}
        className={clsx(
          "font-medium text-sm text-secondary flex-1 h-10 py-2 px-12 rounded-2xl",
          "transition-colors focus-visible:ring-0 focus-visible:border-transparent",
          "bg-cta-modal-secondary",
          "hover:bg-cta-hover-secondary transition-all duration-300 cursor-pointer",
        )}
      >
        Yes, Delete
      </Button>
    </div>
  );
};

export default ConfirmAction;

type ConfirmActionProps = {
  onCancel: () => void;
  onConfirm: () => void;
};
