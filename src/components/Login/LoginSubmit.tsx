import React from "react";
import { UseFormReturn } from "react-hook-form";
import clsx from "clsx";



const LoginSubmit = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <>
      <button
        type="submit"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className={clsx(
          "font-medium text-sm",
          "flex items-center justify-center gap-2 w-full py-3",
          "bg-login-primary rounded-xl shadow-sm disabled:opacity-60",
          "hover:bg-login-primary-hover transition-all disabled:cursor-not-allowed",
        )}
      >
        {form.formState.isSubmitting ? (
          <>
            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <p className="font-medium text-sm text-secondary">Signing in...</p>
          </>
        ) : (
          <p className="font-medium text-sm text-secondary">Sign in</p>
        )}
      </button>
    </>
  );
};

export default LoginSubmit;
