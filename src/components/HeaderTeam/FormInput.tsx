"use client";

import clsx from "clsx";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input as ShadcnInput } from "@/components/ui/input";

const FormInput = ({
  label,
  name,
  className,
  containerClassName,
  form,
  placeholder,
  type = "text",
}: FormInputProps) => {
  return (
    <div
      className={clsx("flex flex-col items-start gap-1", containerClassName)}
    >
      {label && (
        <label htmlFor={name} className="font-medium text-sm text-modal-text">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <ShadcnInput
            {...field}
            id={name}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
            className={clsx(
              "font-normal text-sm text-quinary placeholder:text-quaternary",
              "h-9.5 py-2 px-3 bg-input-bg border border-border-input rounded-[14px]",
              "shadow transition-shadow duration-300",
              "focus:outline-none focus:ring-1 focus:ring-input-focus!",
              "focus-visible:ring-[0.5px] focus-visible:ring-input-focus! focus-visible:border-input-focus!",
              className,
            )}
          />
        )}
      />
    </div>
  );
};

export default FormInput;

type FormInputProps = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  form: UseFormReturn<any>;
  className?: string;
  containerClassName?: string;
};
