"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Employee } from "../../lib/types";
import { deleteEmployeeAction } from "@/app/actions/employees";

import ConfirmDelete from "./ConfirmDelete";

const EmployeeActions = ({
  employee,
  onEditClick,
}: {
  employee: Employee;
  onEditClick: () => void;
}) => {
  const [islOpen, setIsOpen] = useState(false);

  // Function to handle the edit action
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick(); // Call the onEditClick prop to set the editingId in the parent component
  };

  // Function to handle the delete action
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  // Function to handle the confirmation of deletion
  const handleConfirmDelete = async () => {
    try {
      await deleteEmployeeAction(employee.id);
      toast.success(`${employee.fullName} was removed from the team`);
    } catch (error) {
      toast.error(`Failed to delete ${employee.fullName}. Please try again.`);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleEdit}
        className="cursor-pointer text-accordion-role hover:text-accordion-title"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={handleDelete}
        className="cursor-pointer text-accordion-role hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" onClick={() => setIsOpen(true)} />
      </button>
      {islOpen && (
        <ConfirmDelete
          employeeName={employee.fullName}
          onConfirm={handleConfirmDelete}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default EmployeeActions;
