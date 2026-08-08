import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";

import { PageLoading } from "@/components/dashboard/page-loading";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.id) {
    let blocked = false;

    try {
      const apiUrl = new URL(process.env.BACKEND_API_URL as string);
      apiUrl.pathname = "/userinfo";
      apiUrl.searchParams.set("id", session.user.id);

      await axios.get(apiUrl.toString(), {
        headers: {
          Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 403 &&
        error.response?.data?.code === "USER_BLOCKED"
      ) {
        blocked = true;
      }
    }

    if (blocked) {
      redirect("/auth/error?error=AccessDenied");
    }
  }

  return (
    <SidebarProvider className="dark:bg-black">
      <AppSidebar />
      <SidebarInset className="dark:bg-black">
        <PageLoading />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
