"use client";

import { Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LoginSubmit from "./LoginSubmit";
import FormInput from "@/components/HeaderTeam/FormInput";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    console.log("submit...", values);
    await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate a delay
  };

  return (
    <div className="w-full max-w-sm">
      <div className="items-center text-center mb-8">
        <h2 className="font-bold text-2xl text-login-title mb-1">
          Welcome back
        </h2>
        <p className="font-normal text-login-subtitle text-sm">
          Sign in to your account
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            form={form}
            className="h-11.5"
          />
        </div>

        <div>
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            form={form}
            className="h-11.5"
            rightElement={<Eye className="w-5 h-5 text-gray-400" />}
          />
        </div>
        <LoginSubmit form={form} />
      </form>
    </div>
  );
}

type LoginFormValue = {};
