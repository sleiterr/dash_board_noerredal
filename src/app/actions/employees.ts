"use server";

import { revalidatePath } from "next/cache";
import { updateEmployeeStatus } from "@/utils/api/employees";
import type { EmployeeStatus } from "@/lib/types";

export async function setEmployeeStatusAction(
  employeeId: string,
  status: EmployeeStatus,
) {
  await updateEmployeeStatus(employeeId, status);
  revalidatePath("/dashboard/team");
}
