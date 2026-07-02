import type { EmployeeStatus } from "@/lib/types";
import { supabase } from "@/utils/supabase";
import type { Employee } from "@/lib/types";

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

export async function getEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapEmployee);
}

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
