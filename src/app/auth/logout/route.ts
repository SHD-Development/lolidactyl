import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/auth/login");
}
