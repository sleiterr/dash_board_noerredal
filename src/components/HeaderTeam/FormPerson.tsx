"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { createEmployeeAction } from "@/app/actions/employees";
import { CardContent } from "@/components/ui/card";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormActions from "../Header/FormActions";
import FormColorPicker from "./FormColorPicker";

const ROLES = ["Developer", "Designer", "Manager", "Other"];
const LOCATIONS = ["Office", "Remote", "Field", "Warehouse", "Other"];

// moved up because UseFormReturn<PersonFormData> needs this type defined first
type PersonFormData = {
  fullName: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  color: "green" | "purple" | "blue" | "orange" | "rose";
};

export function FormPerson({ onClose, form }: FormPersonProps) {
  const [resetKey, setResetKey] = useState(0);

  async function onSubmit(data: PersonFormData) {
    try {
      await createEmployeeAction(data);
      toast("Person Added!", {
        description: `Full Name: ${data.fullName}, Role: ${data.role}, Location: ${data.location}, Phone: ${data.phone}, Color: ${data.color}`,
      });
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Failed to add person. Please try again.", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <div>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-rows-2 gap-4 mb-4">
            <FormInput
              label="Full Name"
              name="fullName"
              placeholder="e.g Lars Nielsen"
              form={form}
            />
            <FormSelect
              label="Role"
              name="role"
              options={ROLES}
              placeholder="Select a role"
              form={form}
              resetKey={resetKey}
            />
            <FormColorPicker label="Calendar Color" name="color" form={form} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Phone"
              name="phone"
              type="tel"
              placeholder="+45 (050)"
              form={form}
            />
            <FormSelect
              label="Location"
              name="location"
              options={LOCATIONS}
              placeholder="Select a location"
              form={form}
              resetKey={resetKey}
            />
          </div>
          <FormInput
            label="Email"
            containerClassName="mt-4"
            name="email"
            type="email"
            form={form}
            placeholder="email@gmail.com"
          />
        </form>
      </CardContent>
      <div className="flex items-center justify-center gap-2 mt-5">
        <FormActions
          onCancel={() => {
            form.reset();
            onClose();
          }}
          formId="form-rhf-input"
          isValid={form.formState.isValid}
          isSubmitting={form.formState.isSubmitting}
          submitLabel="Add Event"
          submitIcon={<UserPlus className="h-4 w-4 text-white" />}
        />
      </div>
    </div>
  );
}

// props for FormPerson, uses PersonFormData type from above for the form prop
type FormPersonProps = {
  onClose: () => void;
  form: UseFormReturn<PersonFormData>;
};
