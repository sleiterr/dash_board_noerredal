"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal } from "@/components/Modal/Modal";
import { CheckSquare } from "lucide-react";
import FormTask from "./FormTask";

const formSchema = z.object({
  label: z.string().min(1, "Location is required"),
  color: z.enum(["green", "purple", "blue", "orange", "rose"]),
});

const ModalNewTask = ({ onClose, onSuccess }: ModalNewTaskProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      label: "",
      color: "green",
    },
  });

  return (
    <Modal show={true} onClose={onClose}>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-start gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-check-bg rounded-xl flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-check-icon" />
            </div>
            <h4 className="font-semibold text-modal-title text-sm">New Task</h4>
          </div>
        </div>
        <div className="self-center">
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
              className="text-modal-icon-close w-4 h-4 hover:text-stone-700 transition-colors duration-300"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div className="border-b border-border-task -mx-6 mt-4" />
      <div className="flex flex-col mt-5">
        <FormTask onClose={onClose} onSuccess={onSuccess} form={form} />
      </div>
    </Modal>
  );
};
export default ModalNewTask;

type ModalNewTaskProps = {
  onClose: () => void;
  onSuccess?: () => void;
};
