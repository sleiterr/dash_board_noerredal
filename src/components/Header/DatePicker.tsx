"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange, getDefaultClassNames } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const DatePicker = ({
  value,
  onChange,
  triggerClassName,
  calendarClassName,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const defaultClassNames = getDefaultClassNames();

  const displayValue = () => {
    if (!value?.from) return "Pick a date";
    if (!value?.to) return format(value.from, "MMM dd, yyyy");
    return `${format(value.from, "MMM dd")} → ${format(value.to, "MMM dd, yyyy")}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value?.from && "text-quaternary",
            triggerClassName,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-quaternary" />
          <span className={cn(!value?.from && "text-quaternary")}>
            {displayValue()}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-none shadow-lg">
        <Calendar
          mode="range"
          classNames={{
            today: "bg-calendar-toggle rounded-full text-white",
            day_button: cn(
              "data-[range-start=true]:bg-form-event-active data-[range-start=true]:text-white",
              "data-[range-end=true]:bg-form-event-active data-[range-end=true]:text-white",
              "data-[selected-single=true]:bg-form-event-active data-[selected-single=true]:text-secondary",

              "hover:bg-form-event-active hover:text-secondary",
              "data-[range-start=true]:hover:bg-form-event-active",
              "data-[range-end=true]:hover:bg-form-event-active",
            ),
          }}
          selected={value}
          // onSelect is called when the user selects a date range in the calendar. It updates the parent component's state with the new date range and closes the popover if both start and end dates are selected.
          onSelect={(range) => {
            // if the user selects the same date for both from and to, we treat it as a single date selection
            if (
              range?.from &&
              range?.to &&
              format(range.from, "yyyy-MM-dd") ===
                format(range.to, "yyyy-MM-dd")
            ) {
              onChange({ from: range.from, to: undefined });
              setOpen(false);
              return;
            }
            onChange(range);
            if (range?.from && range?.to) setOpen(false);
          }}
          className={calendarClassName}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
};

type DatePickerProps = {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  triggerClassName?: string;
  calendarClassName?: string;
  iconClassName?: string;
  calendarClassNames?: Record<string, string>;
};
