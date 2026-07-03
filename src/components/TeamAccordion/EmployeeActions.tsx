"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Employee } from "../../lib/types";
import { deleteEmployeeAction } from "@/app/actions/employees";

const EmployeeActions = ({ employee }: { employee: Employee }) => {
  // React.MouseEvent
  // stopPropagation used for preventing the accordion from toggling when clicking on the action buttons
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement edit functionality here
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = confirm(
      `Are you sure you want to delete ${employee.fullName}?`,
    );
    if (confirmed) {
      // Call the server action to delete the employee
      deleteEmployeeAction(employee.id);
    }
    // Implement delete functionality here
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
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default EmployeeActions;
