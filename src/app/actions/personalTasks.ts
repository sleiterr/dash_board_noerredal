"use server";

import { revalidatePath } from "next/cache";
import {
  getPersonalTasks,
  createPersonalTask,
  toggleTaskDone,
  deletePersonalTask,
} from "@/utils/api/personalTask";

// Server actions for personal tasks
export async function getPersonalTaskActions() {
  return getPersonalTasks();
}

// Create a new personal task and revalidate the dashboard path
export async function createPersonalTaskAction(label: string, color: string) {
  await createPersonalTask(label, color as any);
  revalidatePath("/dashboard");
}

// Toggle the done status of a personal task and revalidate the dashboard path
export async function toggletaskDoneAction(taskId: string, done: boolean) {
  await toggleTaskDone(taskId, done);
  revalidatePath("/dashboard");
}

// Delete a personal task and revalidate the dashboard path
export async function deletePersonalTaskAction(taskId: string) {
  await deletePersonalTask(taskId);
  revalidatePath("/dashboard");
}
