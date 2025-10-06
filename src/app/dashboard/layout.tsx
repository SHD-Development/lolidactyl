import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { PageLoading } from "@/components/dashboard/page-loading";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageLoading />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
