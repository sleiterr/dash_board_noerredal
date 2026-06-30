"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { format } from "date-fns";

import FormActions from "./FormActions";
import FormInput from "@/components/HeaderTeam/FormInput";
import { CardContent } from "@/components/ui/card";
import FormDatePicker from "./FormDatePicker";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dateRange: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export function FormEvent({ onClose }: { onClose: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      dateRange: undefined,
      startTime: "",
      endTime: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const startDate = format(data.dateRange.from, "yyyy-MM-dd");
    const endDate = data.dateRange.to
      ? format(data.dateRange.to, "yyyy-MM-dd")
      : startDate; // if one day event, endDate is the same as startDate

    toast("Event created!", {
      description: `"${data.title}" scheduled for ${startDate} → ${endDate} from ${data.startTime} to ${data.endTime}.`,
    });
  }

  return (
    <div className="">
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
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
