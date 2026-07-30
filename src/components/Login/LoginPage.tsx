import LoginBranding from "./LoginBranding";
import LoginForm from "./LoginForm";

// components/Login/LoginPage.tsx
export default function LoginPage() {
  return (
    <div className="w-full grid lg:grid-cols-[420px_1fr]">
      <LoginBranding />
      <div className="flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}
