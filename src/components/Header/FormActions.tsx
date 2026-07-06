"use client";

import clsx from "clsx";
import { Button } from "@/components/ui/button";

const FormActions = ({
  onCancel,
  formId,
  isValid,
  isSubmitting,
  submitLabel,
  submitIcon,
}: FormActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-5">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className={clsx(
          "font-medium text-sm text-cta-modal",
          "flex-1 h-10 bg-cta-bg py-2 px-12 rounded-[14px]",
          "hover:bg-cta-bg-hover transition-all duration-300 cursor-pointer border-0",
        )}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form={formId}
        disabled={!isValid || isSubmitting}
        className={clsx(
          "font-medium text-sm text-secondary flex-1 h-10 py-2 px-12 rounded-[14px]",
          "transition-colors focus-visible:ring-0 focus-visible:border-transparent",
          isValid
            ? "bg-form-btn-event hover:bg-cta-modal-hover transition-all duration-300 cursor-pointer"
            : "bg-form-btn-event opacity-40 cursor-not-allowed",
        )}
      >
        {submitIcon}
        {submitLabel}
      </Button>
    </div>
  );
};

export default FormActions;

type FormActionsProps = {
  onCancel: () => void;
  formId: string;
  isValid: boolean;
  isSubmitting: boolean;
  submitLabel: string;
  submitIcon?: React.ReactNode;
};
