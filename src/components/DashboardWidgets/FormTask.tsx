"use client";

import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { createPersonalTaskAction } from "@/app/actions/personalTasks";
import FormActions from "@/components/Header/FormActions";
import FormColorPicker from "@/components/HeaderTeam/FormColorPicker";

import FormInput from "@/components/HeaderTeam/FormInput";

type TaskFormData = {
  label: string;
  color: "green" | "purple" | "blue" | "orange" | "rose";
};

const FormTask = ({ onClose, onSuccess, form }: FormTaskProps) => {
  const selectedColor = form.watch("color");

  async function onSubmit(data: TaskFormData) {
    try {
      await createPersonalTaskAction(data.label, data.color);
      toast.success("Task created successfully");
      form.reset();
      onSuccess?.();
      onClose();
    } catch {
      toast.error("Failed to add task.");
    }
  }

  return (
    <form
      id="form-rhf-input"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="grid grid-rows-2 mb-4">
        <FormInput
          label={
            <>
              Task name <span className="text-rose-400">*</span>
            </>
          }
          name="label"
          placeholder="e.g. Water the greenhouses"
          form={form}
        />
        <FormColorPicker label="Color" name="color" form={form} />
      </div>
      <FormActions
        onCancel={() => {
          form.reset();
          onClose();
        }}
        formId="form-rhf-input"
        isValid={form.formState.isValid}
        isSubmitting={form.formState.isSubmitting}
        submitLabel="Add Task"
      />
    </form>
  );
};

export default FormTask;

type FormTaskProps = {
  onClose: () => void;
  onSuccess?: () => void;
  form: UseFormReturn<TaskFormData>;
};
