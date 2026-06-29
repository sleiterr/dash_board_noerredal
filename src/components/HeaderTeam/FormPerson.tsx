"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { format } from "date-fns";

import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { useState } from "react";

const ROLES = ["Developer", "Designer", "Manager", "Other"];
const LOCATIONS = ["Office", "Remote", "Field", "Warehouse", "Other"];

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().min(1, "Location is required"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\+?[\d\s\-().]{7,15}$/, "Invalid phone number"),
});

export function FormPerson({ onClose }: FormPersonProps) {
  const [resetKey, setResetKey] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      role: "",
      location: "",
      phone: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Person Added !", {
      description: `Full Name: ${data.fullName}, Role: ${data.role}, Location: ${data.location}, Phone: ${data.phone}`,
    });
  }

  return (
    <div className="">
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-rows-2 gap-4 mb-4">
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="form-rhf-input-title"
                className="font-medium text-sm text-modal-text"
              >
                Full Name
              </label>
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    id="form-rhf-input-fullName"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g Lars Nielsen"
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
                htmlFor="form-rhf-input-title"
                className="font-medium text-sm text-modal-text"
              >
                Role
              </label>
              <Controller
                name="role"
                control={form.control}
                render={({ field }) => (
                  <Select
                    key={resetKey}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={clsx(
                        "font-normal text-sm text-quinary placeholder:text-quaternary",
                        "h-9.5! py-2 px-3 bg-input-bg border border-border-input rounded-[14px] w-full",
                        "shadow transition-shadow duration-300",
                        "[&_[data-placeholder]]:text-quaternary",
                      )}
                    >
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-md! border-0">
                      {ROLES.map((role) => (
                        <SelectItem
                          key={role}
                          value={role}
                          className="font-normal text-sm text-quinary cursor-pointer hover:bg-cta-bg-hover transition-all duration-300"
                        >
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          {/*  */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-start gap-1">
              <label
                htmlFor="form-rhf-input-title"
                className="font-medium text-sm text-modal"
              >
                Phone
              </label>
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    type="tel"
                    id="form-person-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="+45 (050)"
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
                htmlFor="form-rhf-input-title"
                className="font-medium text-sm text-modal"
              >
                Location
              </label>
              <Controller
                name="location"
                control={form.control}
                render={({ field }) => (
                  <Select
                    key={resetKey}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={clsx(
                        "font-normal text-sm text-quinary placeholder:text-quaternary",
                        "h-9.5! py-2 px-3 bg-input-bg border border-border-input rounded-[14px] w-full",
                        "shadow transition-shadow duration-300",
                        "[&_[data-placeholder]]:text-quaternary",
                      )}
                    >
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-md! border-0">
                      {LOCATIONS.map((location) => (
                        <SelectItem
                          key={location}
                          value={location}
                          className="font-normal text-sm text-quinary cursor-pointer hover:bg-cta-bg-hover transition-all duration-300"
                        >
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          onClick={() => {
            form.reset();
            setResetKey((prev) => prev + 1);
            onClose();
          }}
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
          <UserPlus className="h-4 w-4 text-white" />
          Add Person
        </Button>
      </div>
    </div>
  );
}

type FormPersonProps = {
  onClose: () => void;
};
