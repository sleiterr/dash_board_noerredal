// utils/api/employees.ts
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
  const { data, error } = await supabase.from("employees").select("*");
  if (error) throw error;
  return (data ?? []).map(mapEmployee);
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
