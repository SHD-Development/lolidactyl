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
      image: session?.user?.image as string,
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
    <Sidebar collapsible="icon" {...props} variant="inset" className="">
      <SidebarHeader className="pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" asChild>
                  <Link
                    href="/dashboard"
                    className="group/home relative overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 text-white flex aspect-square size-8 items-center justify-center rounded-xl shadow-lg transition-all duration-500 group-hover/home:scale-110 group-hover/home:shadow-2xl group-hover/home:from-blue-400 group-hover/home:via-purple-400 group-hover/home:to-purple-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/home:opacity-100 transition-opacity duration-500" />
                      <Cloud className="size-4 transition-all duration-500 group-hover/home:rotate-12 group-hover/home:scale-110 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/20 opacity-0 group-hover/home:opacity-100 transition-opacity duration-700 delay-100" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 bg-clip-text text-transparent transition-all duration-300 group-hover/home:from-blue-500 group-hover/home:via-purple-500 group-hover/home:to-purple-600">
                        Lolidactyl
                      </span>
                      <div className="relative h-4 overflow-hidden">
                        <span className="absolute truncate text-xs text-muted-foreground transition-all duration-300 ease-in-out group-hover/home:-translate-y-4 group-hover/home:opacity-0">
                          {t("dashboard")}
                        </span>
                        <span className="absolute truncate text-xs bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold transition-all duration-300 ease-in-out translate-y-4 opacity-0 group-hover/home:translate-y-0 group-hover/home:opacity-100">
                          {t("go")}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover/home:opacity-100 transition-opacity duration-500 rounded-lg" />
                  </Link>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-xl border bg-white/95 backdrop-blur-xl dark:bg-zinc-900/95 shadow-2xl"
                align="start"
                sideOffset={8}
              >
                <DropdownMenuLabel className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
                  {t("destination")}
                </DropdownMenuLabel>

                <div className="p-2 space-y-1">
                  <DropdownMenuItem className="gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 focus:bg-zinc-50 dark:focus:bg-zinc-800/50 group cursor-pointer">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 w-full h-full"
                    >
                      <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all duration-300 group-hover:scale-110">
                        <CircleGauge className="size-4 shrink-0 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:rotate-12" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                          {t("index")}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
                          {t("descriptions.index")}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 focus:bg-zinc-50 dark:focus:bg-zinc-800/50 group cursor-pointer">
                    <Link
                      href="/"
                      className="flex items-center gap-3 w-full h-full"
                    >
                      <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all duration-300 group-hover:scale-110">
                        <Home className="size-4 shrink-0 text-green-600 dark:text-green-400 transition-all duration-300 group-hover:-rotate-12" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                          {t("home")}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
                          {t("descriptions.home")}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 focus:bg-zinc-50 dark:focus:bg-zinc-800/50 group cursor-pointer">
                    <Link
                      href="/docs"
                      className="flex items-center gap-3 w-full h-full"
                    >
                      <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all duration-300 group-hover:scale-110">
                        <BookOpen className="size-4 text-amber-600 dark:text-amber-400 transition-all duration-300 group-hover:rotate-6" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                          {t("docs")}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
                          {t("descriptions.docs")}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 focus:bg-zinc-50 dark:focus:bg-zinc-800/50 group cursor-pointer">
                    <Link
                      href={process.env.NEXT_PUBLIC_PANEL_URL as string}
                      className="flex items-center gap-3 w-full h-full"
                    >
                      <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all duration-300 group-hover:scale-110">
                        <Server className="size-4 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:-rotate-6" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                          {t("panel")}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
                          {t("descriptions.panel")}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="pt-4">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
