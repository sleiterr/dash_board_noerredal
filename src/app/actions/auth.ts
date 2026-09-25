"use server";

import { cookies } from "next/headers";
import { veryfyLogin } from "@/utils/api/auth";
import { createSessionToken } from "@/utils/auth/jwt";

// async function loginAction(email: string, password: string) {
export async function loginAction(email: string, password: string) {
  const isValid = await veryfyLogin(email, password);

  if (!isValid) {
    return { success: false, message: "Invalid email or password" };
  }

  const token = await createSessionToken(email);

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return { success: true };
}

export async function logoutAction() {
  (await cookies()).delete("token");
}
