"use server";

import { revalidatePath } from "next/cache";
import {
  deleteEmployee,
  updateEmployee,
  updateEmployeeStatus,
} from "@/utils/api/employees";
import type { Employee, EmployeeStatus } from "@/lib/types";

//? This function is a server action that updates the status of an employee and revalidates the cache for the team dashboard page.
export async function setEmployeeStatusAction(
  employeeId: string,
  status: EmployeeStatus,
) {
  await updateEmployeeStatus(employeeId, status);
  revalidatePath("/dashboard/team");
}

//? This function is a server action that deletes an employee and revalidates the cache for the team dashboard page.
export async function deleteEmployeeAction(employeeId: string) {
  await deleteEmployee(employeeId);
  revalidatePath("/dashboard/team");
}

//? This function is a server action that updates an employee's information and revalidates the cache for the team dashboard page.
export async function updateEmployeeAction(
  employeeId: string,
  updates: Partial<Omit<Employee, "id">>,
) {
  await updateEmployee(employeeId, updates);
  revalidatePath("/dashboard/team");
}
