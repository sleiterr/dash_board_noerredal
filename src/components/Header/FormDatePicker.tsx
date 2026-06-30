"use client";

import clsx from "clsx";
import { Controller, UseFormReturn } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { DatePicker } from "@/components/Header/DatePicker";

const FormDatePicker = ({ label, name, form }: FormDatePickerProps) => {
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
          <DatePicker
            value={field.value as DateRange}
            onChange={field.onChange}
            triggerClassName={clsx(
              "font-normal text-sm text-quinary",
              "h-9.5 py-2 px-3 bg-input-bg rounded-[14px]",
              "border border-border-input",
            )}
            calendarClassName="rounded-[14px] bg-white! shadow-lg text-black!"
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;

type FormDatePickerProps = {
  label?: string;
  name: string;
  form: UseFormReturn<any>;
};
