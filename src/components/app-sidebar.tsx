"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Cloud,
  Home,
  Server,
  CircleGauge,
  Droplet,
  Store,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import appConfig from "@/config";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isPathActive = (url: string) => {
    if (url === "#") return false;
    return pathname.startsWith(url);
  };
  const t = useTranslations("sidebar");
  const data = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      avatar: session?.user?.image as string,
    },
    navMain: [
      {
        title: t("servers"),
        url: "#",
        icon: Server,
        isActive: isPathActive("/dashboard/servers"),
        items: [
          {
            title: t("create"),
            url: "/dashboard/servers/create",
            isActive: isPathActive("/dashboard/servers/create"),
          },
          {
            title: t("manage"),
            url: "/dashboard/servers/manage",
            isActive: isPathActive("/dashboard/servers/manage"),
          },
        ],
      },
      {
        title: t("droplets"),
        url: "#",
        icon: Droplet,
        isActive: isPathActive("/dashboard/droplets"),
        items: [
          {
            title: t("coupons"),
            url: "/dashboard/droplets/coupons",
            isActive: isPathActive("/dashboard/droplets/coupons"),
          },
          {
            title: t("transfer"),
            url: "/dashboard/droplets/transfer",
            isActive: isPathActive("/dashboard/droplets/transfer"),
          },
        ],
      },
      // {
      //   title: t("store"),
      //   url: "/dashboard/store",
      //   icon: Store,
      //   isActive: isPathActive("/dashboard/store"),
      //   items: [
      //     {
      //       title: t("general"),
      //       url: "/dashboard/store/general",
      //       isActive: isPathActive("/dashboard/store/general"),
      //     },
      //   ],
      // },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props} variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/dashboard" className="group/home">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <Cloud />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Lolidactyl</span>
                      <div className="relative h-4 overflow-hidden">
                        <span className="absolute truncate text-xs transition-transform duration-300 ease-in-out group-hover/home:-translate-y-4 group-hover/home:opacity-0">
                          {t("dashboard")}
                        </span>
                        <span className="absolute truncate text-xs transition-transform duration-300 ease-in-out translate-y-4 opacity-0 group-hover/home:translate-y-0 group-hover/home:opacity-100">
                          {t("go")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg "
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-muted-foreground text-xs">
                  {t("destination")}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 w-full h-full"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <CircleGauge className="size-3.5 shrink-0" />
                    </div>
                    <span>{t("index")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2 w-full h-full"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <Home className="size-3.5 shrink-0" />
                    </div>
                    <span>{t("home")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2">
                  <Link
                    href={process.env.NEXT_PUBLIC_PANEL_URL as string}
                    className="flex items-center gap-2 w-full h-full"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <Server className="size-4" />
                    </div>
                    <span>{t("panel")}</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
