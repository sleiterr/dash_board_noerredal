import { unstable_noStore as noStore } from "next/cache";
import type { EmployeeStatus } from "@/lib/types";
import { supabase } from "@/utils/supabase";
import type { Employee } from "@/lib/types";

// Map the database row to the Employee type
function mapEmployee(row: EmployeeRow): Employee {
  return {
    id: row.id,
    fullName: row.full_name,
    role: row.role,
    location: row.location,
    phone: row.phone,
    email: row.email,
    color: row.color,
    status: row.status,
  };
}

// Fetch all employees from the database
export async function getEmployees(): Promise<Employee[]> {
  noStore();
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapEmployee);
}

// Update employee status
export async function updateEmployeeStatus(
  employeeId: string,
  status: EmployeeStatus,
): Promise<void> {
  const { error } = await supabase
    .from("employees")
    .update({ status })
    .eq("id", employeeId);

  if (error) throw error;
}

// Delete an employee from the database
export async function deleteEmployee(employeeId: string): Promise<void> {
  const { error } = await supabase
    .from("employees")
    .delete()
    .eq("id", employeeId);
  if (error) throw error;
}

export async function updateEmployee(
  employeeId: string,
  updates: Partial<Omit<Employee, "id">>,
): Promise<void> {
  const dbUpdates: Record<string, unknown> = {};

  // Map the updates to the database column names
  if (updates.fullName !== undefined) dbUpdates.full_name = updates.fullName;
  if (updates.role !== undefined) dbUpdates.role = updates.role;
  if (updates.location !== undefined) dbUpdates.location = updates.location;
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
  if (updates.email !== undefined) dbUpdates.email = updates.email;
  if (updates.color !== undefined) dbUpdates.color = updates.color;
  if (updates.status !== undefined) dbUpdates.status = updates.status;

  // Update the employee in the database
  const { error } = await supabase
    .from("employees")
    .update(dbUpdates)
    .eq("id", employeeId);
  if (error) throw error;
}

//! Partial<Omit<Employee, "id">> is used to allow updates to any property of the Employee type except for the id, which should remain unchanged. This ensures that when updating an employee's information, the unique identifier (id) is not modified, maintaining data integrity in the database.

// Insert a new employee into the database and return the created record
export async function createEmployee(person: {
  fullName: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  color: Employee["color"];
}): Promise<Employee> {
  const { data, error } = await supabase
    .from("employees")
    .insert({
      full_name: person.fullName,
      role: person.role,
      location: person.location,
      phone: person.phone,
      email: person.email,
      color: person.color,
      status: "present", // Default status for new employees
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapEmployee(data);
}

export async function updateEmpoyeeStatus(
  employeeId: string,
  updates: Partial<{
    fullName: string;
    role: string;
    location: string;
    phone: string;
    email: string;
    color: Employee["color"];
  }>,
): Promise<void> {
  const dbUpdates: Record<string, unknown> = {};

  // Map the updates to the database column names
  if (updates.fullName !== undefined) dbUpdates.full_name = updates.fullName;
  if (updates.role !== undefined) dbUpdates.role = updates.role;
  if (updates.location !== undefined) dbUpdates.location = updates.location;
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
  if (updates.email !== undefined) dbUpdates.email = updates.email;
  if (updates.color !== undefined) dbUpdates.color = updates.color;

  // Update the employee in the database
  const { error } = await supabase
    .from("employees")
    .update(dbUpdates)
    .eq("id", employeeId);
  if (error) throw error;
}

type EmployeeRow = {
  id: string;
  full_name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  color: Employee["color"];
  status: Employee["status"];
};
