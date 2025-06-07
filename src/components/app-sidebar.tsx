"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Cloud,
  CircleGauge,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  session: Session | null;
};

export function AppSidebar({ session, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations();
  const isPathActive = (url: string) => {
    if (url === "#") return false;
    return pathname.startsWith(url);
  };
  const data = {
    navMain: [
      {
        title: "Posts Management",
        url: "",
        icon: SquareTerminal,
        isActive: isPathActive("/dashboard/post"),
        items: [
          {
            title: "Posts Overview",
            url: "/dashboard/post/overview",
            isActive: isPathActive("/dashboard/post/overview"),
          },
          {
            title: "Create Posts",
            url: "/dashboard/post/create",
            isActive: isPathActive("/dashboard/post/create"),
          },
          {
            title: "Manage Posts",
            url: "/dashboard/post/manage",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="group/home">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Cloud />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{t("appName")}</span>
                  <div className="relative h-4 overflow-hidden">
                    <span className="absolute truncate text-xs transition-transform duration-300 ease-in-out group-hover/home:-translate-y-4 group-hover/home:opacity-0">
                      Dashboard
                    </span>
                    <span className="absolute truncate text-xs transition-transform duration-300 ease-in-out translate-y-4 opacity-0 group-hover/home:translate-y-0 group-hover/home:opacity-100">
                      Back to home page
                    </span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <Link href="/dashboard">
            <SidebarMenuButton>
              <CircleGauge />
              Dashboard
            </SidebarMenuButton>
          </Link>
        </SidebarGroup>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
