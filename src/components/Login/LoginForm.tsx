"use client";
import { useState } from "react";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);
    // TODO: replace with real submit (API route / server action)
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-foreground text-2xl font-bold mb-1">Welcome back</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Sign in to your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Enter your email"
            autoFocus
            className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground mb-1.5">
            Password
          </label>
          <PasswordInput
            value={password}
            onChange={(v) => {
              setPassword(v);
              setError("");
            }}
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <>
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
}
