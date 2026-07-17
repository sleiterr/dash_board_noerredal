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
import { createTaskAction, updateTaskAction } from "@/app/actions/tasks";
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

export function FormEvent({ onClose, task }: FormEventProps) {
  const { refetchTasks } = useCalendar();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const isEditMode = !!task;

  // Fetch employees when the component mounts
  useEffect(() => {
    getEmployeesAction().then(setEmployees).catch(console.error);
  }, []);

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: task
      ? {
          title: task.title,
          dateRange: {
            from: new Date(task.start.toPlainDate().toString()),
          },
          startTime: task.start.toPlainTime().toString().slice(0, 5),
          endTime: task.end.toPlainTime().toString().slice(0, 5),
          employeeId: task.employeeId ?? null,
        }
      : {
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

      if (isEditMode) {
        await updateTaskAction(task!.id, {
          title: data.title,
          employee_id: data.employeeId ?? null,
          start_at,
          end_at,
        });
      } else {
        await createTaskAction({
          title: data.title,
          employee_id: data.employeeId ?? null,
          start_at,
          end_at,
        });
      }

      await refetchTasks();

      toast.success(
        isEditMode
          ? `"${data.title}" updated in calendar!`
          : `"${data.title}" added to calendar!`,
      );
      form.reset();
      onClose();
    } catch {
      toast.error(
        isEditMode
          ? "Failed to update event. Please try again."
          : "Failed to create event. Please try again.",
      );
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

type FormEventProps = {
  onClose: () => void;
  task?: {
    id: string;
    title: string;
    start: { toPlainDate: () => any; toPlainTime: () => any };
    end: { toPlainDate: () => any; toPlainTime: () => any };
    employeeId?: string | null;
  };
};
