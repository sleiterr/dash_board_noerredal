"use server";

import { revalidatePath } from "next/cache";
import { createTask, getTasks } from "@/utils/api/tasks";

// Create a new task/event and revalidate the dashboard
export async function createTaskAction(payload: {
  title: string;
  employee_id: string | null;
  start_at: string;
  end_at: string;
  description?: string;
}) {
  const task = await createTask(payload);
  revalidatePath("/dashboard");
  return task;
}

// Fetch all tasks — used by client components via server action
export async function getTasksAction() {
  return getTasks();
}
