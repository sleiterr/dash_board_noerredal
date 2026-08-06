import { supabase } from "@/utils/supabase";

// function use for login verification

export async function veryfyLogin(email: string, password: string) {
  const { data, error } = await supabase.rpc("verify_user_password", {
    input_email: email,
    input_password: password,
  });
  if (error || !data) return null;
  return data;
}
