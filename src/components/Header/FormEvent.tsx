"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "./DatePicker";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export function FormEvent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Event created !", {
      description: `"${data.title}" has been created successfully. Date: ${data.date}`,
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <div className="">
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="form-rhf-input-title"
                className="font-medium text-sm text-modal-text"
              >
                Event Title
              </label>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    id="form-rhf-input-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter event title..."
                    autoComplete="off"
                    className={clsx(
                      "font-normal text-sm text-quinary placeholder:text-quaternary",
                      "h-9.5 py-2 px-3 bg-input-bg border border-border-input rounded-[14px]",
                      "shadow transition-shadow duration-300",
                      "focus:outline-none focus:ring-1 focus:ring-input-focus!",
                      "focus-visible:ring-[0.5px] focus-visible:ring-input-focus! focus-visible:border-input-focus!",
                    )}
                  />
                )}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="form-rhf-input-date"
                className="font-medium text-sm text-modal-text"
              >
                Date
              </label>
              <Controller
                name="date"
                control={form.control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    triggerClassName={clsx(
                      "font-normal text-sm text-quaternary",
                      "h-9.5 py-2 px-3 bg-input-bg rounded-[14px]",
                      "border border-border-input",
                      "shadow transition-shadow duration-300",
                      "focus:outline-none focus:ring-1 focus:ring-input-focus!",
                      "focus-visible:ring-[0.5px] focus-visible:ring-input-focus! focus-visible:border-input-focus!",
                    )}
                    calendarClassName="rounded-[14px] bg-white! shadow-lg"
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="form-rhf-input-startTime"
                className="font-medium text-sm text-modal-text"
              >
                Start
              </label>
              <Controller
                name="startTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="time"
                    id="form-rhf-input-startTime"
                    aria-invalid={fieldState.invalid}
                    className={clsx(
                      "font-normal text-sm text-quinary placeholder:text-quaternary",
                      "h-9.5 py-2 px-3 bg-input-bg border border-border-input rounded-[14px]",
                      "shadow transition-shadow duration-300",
                      "focus:outline-none focus:ring-1 focus:ring-input-focus!",
                      "focus-visible:ring-[0.5px] focus-visible:ring-input-focus! focus-visible:border-input-focus!",
                    )}
                  />
                )}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="form-rhf-input-endTime"
                className="font-medium text-sm text-modal-text"
              >
                End
              </label>
              <Controller
                name="endTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="time"
                    id="form-rhf-input-endTime"
                    aria-invalid={fieldState.invalid}
                    className={clsx(
                      "font-normal text-sm text-quinary placeholder:text-quaternary",
                      "h-9.5 py-2 px-3 bg-input-bg border border-border-input rounded-[14px]",
                      "shadow transition-shadow duration-300",
                      "focus:outline-none focus:ring-1 focus:ring-input-focus!",
                      "focus-visible:ring-[0.5px] focus-visible:ring-input-focus! focus-visible:border-input-focus!",
                    )}
                  />
                )}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <div className="flex items-center justify-center gap-2 mt-5">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
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
          form="form-rhf-input"
          disabled={form.formState.isSubmitting}
          className={clsx(
            "font-medium text-sm text-secondary flex-1 h-10 py-2 px-12 rounded-[14px]",
            "transition-colors focus-visible:ring-0 focus-visible:border-transparent",
            "",
            form.formState.isValid
              ? "bg-form-btn-event hover:bg-cta-modal-hover transition-all duration-300 cursor-pointer"
              : "bg-form-btn-event opacity-40 cursor-not-allowed",
          )}
        >
          Add Event
        </Button>
      </div>
    </div>
  );
}
