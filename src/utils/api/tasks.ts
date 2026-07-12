import { supabase } from "@/utils/supabase";

// Fetch all tasks from the database
export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select(`*, employee:employees(*)`);

  if (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }

  return data ?? [];
}

// Create a new task in the database
export async function createTask(payload: {
  title: string;
  employee_id: string | null;
  start_at: string;
  end_at: string;
  description?: string;
}) {
  const { data, error } = await supabase
    .from("tasks")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete a task from the database
export async function deleteTask(taskId: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) throw error;
}
