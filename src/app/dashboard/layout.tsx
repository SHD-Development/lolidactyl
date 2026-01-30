import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { headers } from "next/headers";

import { PageLoading } from "@/components/dashboard/page-loading";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
