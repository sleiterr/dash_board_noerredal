import { supabase } from "@/utils/supabase";

// API functions for managing personal tasks
export type PersonalTask = {
  id: string;
  label: string;
  done: boolean;
  color: "green" | "purple" | "blue" | "orange" | "rose";
};

// Fetch all personal tasks from the database
export async function getPersonalTasks(): Promise<PersonalTask[]> {
  const { data, error } = await supabase
    .from("personal_tasks")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

// Create a new personal task in the database
export async function createPersonalTask(
  label: string,
  color: PersonalTask["color"],
) {
  const { data, error } = await supabase
    .from("personal_tasks")
    .insert([{ label, color }])
    .select()
    .single();

  if (error) throw error;
  return data ?? [];
}

// Delete a personal task from the database
export async function toggleTaskDone(taskId: string, done: boolean) {
  const { error } = await supabase
    .from("personal_tasks")
    .update({ done })
    .eq("id", taskId);

  if (error) throw error;
}

// Delete a personal task from the database
export async function deletePersonalTask(taskId: string) {
  const { error } = await supabase
    .from("personal_tasks")
    .delete()
    .eq("id", taskId);

  if (error) throw error;
}

// .from() Select the table
// .insert() Add a new record
// .select() Return the data
// .single() Return a single record
// .update()  // Update existing data
// .eq()      // Filter by a condition
