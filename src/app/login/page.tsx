import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="space-y-4">
        <AuthForm mode="login" />
        <p className="text-center text-sm">
          New here? <Link href="/register" className="text-[var(--primary)] underline">Create account</Link>
        </p>
      </div>
    </main>
  );
}
