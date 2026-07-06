"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateEmployeeAction } from "@/app/actions/employees";
import type { Employee } from "@/lib/types";
import FormInput from "../HeaderTeam/FormInput";
import FormSelect from "../HeaderTeam/FormSelect";
import FormColorPicker from "../HeaderTeam/FormColorPicker";
import FormActions from "../Header/FormActions";
import { Save } from "lucide-react";

// array of predefined roles for the role select input
const ROLES = ["Developer", "Designer", "Manager", "Other"];

type EditPersonFormData = {
  fullName: string;
  role: string;
  color: Employee["color"];
};
// Props for the EditPersonForm component
const EditPersonForm = ({
  employee,
  onCancel,
  onSave,
}: EditPersonFormProps) => {
  const form = useForm<EditPersonFormData>({
    defaultValues: {
      fullName: employee.fullName,
      role: employee.role,
      color: employee.color,
    },
  });

  // Handle form submission
  async function onSubmit(data: EditPersonFormData) {
    try {
      await updateEmployeeAction(employee.id, data);
      toast.success("Person updated successfully!");
      onSave();
    } catch (error) {
      toast.error("Failed to update person. Please try again.");
    }
  }

  return (
    <div>
      <form
        id={`edit-person-form-${employee.id}`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <FormColorPicker label="Color" name="color" form={form} />
            <FormInput label="Full Name" name="fullName" form={form} />
            <FormSelect label="Role" name="role" form={form} options={ROLES} />
          </div>
          <FormActions
            onCancel={onCancel}
            formId={`edit-person-form-${employee.id}`}
            isValid={form.formState.isValid}
            isSubmitting={form.formState.isSubmitting}
            submitLabel="Save"
            submitIcon={<Save className="w-4 h-4" />}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPersonForm;

type EditPersonFormProps = {
  employee: Employee;
  onCancel: () => void;
  onSave: () => void;
};
