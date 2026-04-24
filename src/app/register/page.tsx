import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="space-y-4">
        <AuthForm mode="register" />
        <p className="text-center text-sm">
          Already have an account? <Link href="/login" className="text-[var(--primary)] underline">Login</Link>
        </p>
      </div>
    </main>
  );
}
