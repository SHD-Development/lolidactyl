import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { PageLoading } from "@/components/dashboard/page-loading";

type BackendErrorResponse = {
  code?: string;
};

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
      const backendApiUrl = process.env.BACKEND_API_URL;
      const backendApiKey = process.env.BACKEND_API_KEY;

      if (backendApiUrl && backendApiKey) {
        const apiUrl = new URL(backendApiUrl);
        apiUrl.pathname = "/userinfo";
        apiUrl.searchParams.set("id", session.user.id);

        const response = await fetch(apiUrl.toString(), {
          headers: {
            Authorization: `Bearer ${backendApiKey}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (response.status === 403) {
          const data = (await response
            .json()
            .catch(() => null)) as BackendErrorResponse | null;
          blocked = data?.code === "USER_BLOCKED";
        }
      }
    } catch (error) {
      console.error("Failed to validate blocked user status:", error);
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
