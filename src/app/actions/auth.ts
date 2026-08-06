"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { veryfyLogin } from "@/utils/api/auth";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret_key",
);

export async function loginAction(email: string, password: string) {
  const isValid = await veryfyLogin(email, password);

  if (!isValid) {
    return { success: false, message: "Invalid email or password" };
  }

  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  // Set the JWT token in an HTTP-only cookie for secure storage
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
