import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 dark:bg-zinc-800">
      <LoginForm className="w-full md:w-1/2 lg:w-1/3" />
    </div>
  );
}
