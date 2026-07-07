"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { format } from "date-fns";

import FormActions from "./FormActions";
import FormInput from "@/components/HeaderTeam/FormInput";
import { CardContent } from "@/components/ui/card";
import FormDatePicker from "./FormDatePicker";
import EmployeePicker from "./EmployeePicker";
import { getEmployeesAction } from "@/app/actions/employees";
import { createTaskAction } from "@/app/actions/tasks";
import { useCalendar } from "@/components/Calendar/CalendarContext";
import type { Employee } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dateRange: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  employeeId: z.string().nullable().optional(),
});

export function FormEvent({ onClose }: { onClose: () => void }) {
  const { calendar } = useCalendar();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getEmployeesAction().then(setEmployees).catch(console.error);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      dateRange: undefined,
      startTime: "",
      endTime: "",
      employeeId: null,
    },
  });

  useEffect(() => {
    form.trigger();
  }, [form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const startDate = format(data.dateRange.from, "yyyy-MM-dd");
      const endDate = data.dateRange.to
        ? format(data.dateRange.to, "yyyy-MM-dd")
        : startDate;

      const start_at = `${startDate}T${data.startTime}:00`;
      const end_at = `${endDate}T${data.endTime}:00`;

      // Save to database
      const task = await createTaskAction({
        title: data.title,
        employee_id: data.employeeId ?? null,
        start_at,
        end_at,
      });

      // Add to calendar UI immediately (no page reload needed)
      calendar.events.add({
        id: String(task.id),
        title: data.title,
        start:
          Temporal.PlainDateTime.from(start_at).toZonedDateTime(
            "Europe/Copenhagen",
          ),
        end: Temporal.PlainDateTime.from(end_at).toZonedDateTime(
          "Europe/Copenhagen",
        ),
      });

      toast.success(`"${data.title}" added to calendar!`);
      form.reset();
      onClose();
    } catch {
      toast.error("Failed to create event. Please try again.");
    }
  }

  return (
    <div className="">
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="self-start mb-4">
            <Controller
              name="employeeId"
              control={form.control}
              render={({ field }) => (
                <EmployeePicker
                  employees={employees}
                  value={field.value ?? null}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <FormInput
              form={form}
              label="Event Title"
              name="title"
              placeholder="Enter event title..."
            />
            <FormDatePicker label="Date" name="dateRange" form={form} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput label="Start" name="startTime" type="time" form={form} />
            <FormInput label="End" name="endTime" type="time" form={form} />
          </div>
        </form>
      </CardContent>
      <FormActions
        onCancel={() => {
          form.reset();
          onClose();
        }}
        formId="form-rhf-input"
        isValid={form.formState.isValid}
        isSubmitting={form.formState.isSubmitting}
        submitLabel="Add Event"
      />
    </div>
  );
}
