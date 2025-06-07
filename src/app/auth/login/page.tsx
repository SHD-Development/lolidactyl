import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Login() {
  const session = await auth();
  if (session?.user) return redirect("/dashboard");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 dark:bg-zinc-800">
      <LoginForm className="w-full md:w-1/2 lg:w-1/3" />
    </div>
  );
}
