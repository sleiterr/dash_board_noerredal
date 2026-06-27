import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            triggerClassName,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => {
            if (date) {
              onChange(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }
          }}
          className={calendarClassName}
        />
      </PopoverContent>
    </Popover>
  );
};

type DatePickerProps = {
  value: string;
  onChange: (date: string) => void;
  triggerClassName?: string;
  calendarClassName?: string;
};
