"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import clsx from "clsx";
import { Modal } from "@/components/Modal/Modal";
import { FormPerson } from "./FormPerson";
import { EVENT_COLOR_DATA, getInitials } from "@/lib/eventColors";

// Define the form schema using Zod
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().min(1, "Location is required"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\+?[\d\s\-().]{7,15}$/, "Invalid phone number"),
  color: z.enum(["green", "purple", "blue", "orange", "rose"]),
  email: z.string().email("Invalid email address"),
});

// Define the type for the form data based on the schema
// resolver: zodResolver(formSchema) will ensure that the form data adheres to this schema
const ModalAddPerson = ({ onClose }: ConfirmDeleteModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      role: "",
      location: "",
      phone: "",
      color: "green",
      email: "",
    },
  });

  // fullName role color are watched to update the avatar and display information in real-time
  const fullName = form.watch("fullName");
  // role and color are watched to update the avatar and display information in real-time
  const role = form.watch("role");
  // color is watched to update the avatar and display information in real-time
  const color = form.watch("color");
  // Get the color data for the selected color
  const colors = EVENT_COLOR_DATA[color];
  // Get the initials for the full name to display in the avatar
  const initials = getInitials(fullName);

  return (
    <Modal show={true} onClose={onClose}>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-start gap-3">
          <div
            className={clsx(
              "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-md transition-all",
              colors.avatarBg,
              colors.avatarText,
            )}
          >
            {initials}
          </div>
          <div>
            <h4 className="text-modal-title font-semibold text-sm">
              {fullName.trim() || "New Person"}
            </h4>
            <p className="text-quaternary text-xs">{role || "Select a role"}</p>
          </div>
        </div>
        <div className="self-start">
          <button
            onClick={onClose}
            className="font-bold text-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-modal-icon-close w-6 h-6 hover:text-stone-700 transition-colors duration-300"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="border-b border-header-border -mx-6 mt-4" />
      <div className="flex flex-col mt-5">
        <FormPerson onClose={onClose} form={form} />
      </div>
    </Modal>
  );
};

export default ModalAddPerson;

type ConfirmDeleteModalProps = {
  onClose: () => void;
};
