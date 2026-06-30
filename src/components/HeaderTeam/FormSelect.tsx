"use client";

import clsx from "clsx";
import { Controller, UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSelect = ({
  label,
  name,
  options,
  placeholder,
  form,
  resetKey,
}: FormSelectProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {label && (
        <label htmlFor={name} className="font-medium text-sm text-modal-text">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <Select
            key={resetKey}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger
              className={clsx(
                "font-normal text-sm text-quinary placeholder:text-quaternary",
                "h-9.5! py-2 px-3 bg-input-bg border border-border-input rounded-[14px] w-full",
                "shadow transition-shadow duration-300",
                "[&_[data-placeholder]]:text-quaternary",
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md! border-0">
              {options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="font-normal text-sm text-quinary cursor-pointer hover:bg-cta-bg-hover transition-all duration-300"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default FormSelect;

type FormSelectProps = {
  label?: string;
  name: string;
  options: string[];
  placeholder?: string;
  form: UseFormReturn<any>;
  resetKey?: number;
};
