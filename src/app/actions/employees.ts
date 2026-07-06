"use server";

import { revalidatePath } from "next/cache";
import {
  deleteEmployee,
  updateEmployee,
  updateEmployeeStatus,
  createEmployee,
  getEmployees,
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

//? This function is a server action that updates an employee's details and revalidates the cache for the team dashboard page.
export async function updateEmployeeAction(
  employeeId: string,
  updates: Partial<{
    fullName: string;
    role: string;
    location: string;
    phone: string;
    email: string;
    color: Employee["color"];
  }>,
) {
  await updateEmployee(employeeId, updates);
  revalidatePath("/dashboard/team");
}

//? This function is a server action that creates a new employee and revalidates the cache for the team dashboard page.
export async function createEmployeeAction(person: {
  fullName: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  color: Employee["color"];
}) {
  await createEmployee(person);
  revalidatePath("/dashboard/team");
}

//? Server action for client components to fetch all employees
export async function getEmployeesAction(): Promise<Employee[]> {
  return getEmployees();
}
