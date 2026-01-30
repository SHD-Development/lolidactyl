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
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import appConfig from "@/config";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
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
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props} variant="floating" className="">
      <SidebarHeader className="pb-4 dark:bg-zinc-950 rounded-lg">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/dashboard" className="group/home">
                    <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg transition-colors hover:bg-primary/90">
                      <Cloud className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Lolidactyl</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {t("dashboard")}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-xl border bg-white/95 backdrop-blur-xl dark:bg-black shadow-2xl"
                align="start"
                sideOffset={8}
              >
                <DropdownMenuLabel className="text-xs font-semibold px-4 py-2 text-muted-foreground">
                  {t("destination")}
                </DropdownMenuLabel>

                <div className="p-1">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <CircleGauge className="mr-2 h-4 w-4" />
                      <span>{t("index")}</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/" className="cursor-pointer">
                      <Home className="mr-2 h-4 w-4" />
                      <span>{t("home")}</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/docs" className="cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>{t("docs")}</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href={process.env.NEXT_PUBLIC_PANEL_URL as string} className="cursor-pointer">
                      <Server className="mr-2 h-4 w-4" />
                      <span>{t("panel")}</span>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="dark:bg-zinc-950">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-2">
            {t("platform")}
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`group relative overflow-hidden rounded-lg transition-all duration-300 hover:bg-gradient-to-r ${
                        index === 0
                          ? "hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/30 dark:hover:to-indigo-950/30"
                          : "hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950/30 dark:hover:to-teal-950/30"
                      } hover:shadow-sm`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        {item.icon && (
                          <div
                            className={`flex items-center justify-center size-5 rounded-md transition-all duration-300 ${
                              index === 0
                                ? "text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                                : "text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
                            }`}
                          >
                            <item.icon className="size-4" />
                          </div>
                        )}
                        <span className="font-medium transition-colors duration-300 group-hover:text-foreground">
                          {item.title}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 ml-auto transition-all duration-300 group-data-[state=open]/collapsible:rotate-90 ${
                            index === 0
                              ? "text-blue-500 dark:text-blue-400"
                              : "text-emerald-500 dark:text-emerald-400"
                          } group-hover:scale-110`}
                        />
                      </div>
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${
                          index === 0
                            ? "from-blue-500/5 to-indigo-500/5"
                            : "from-emerald-500/5 to-teal-500/5"
                        } rounded-lg`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-in-out">
                    <SidebarMenuSub className="ml-4 border-l-2 border-muted/30 pl-4 space-y-1">
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                            className={`group relative overflow-hidden rounded-lg transition-all duration-300 hover:bg-gradient-to-r ${
                              index === 0
                                ? "hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-blue-950/20 dark:hover:to-indigo-950/20"
                                : "hover:from-emerald-50/50 hover:to-teal-50/50 dark:hover:from-emerald-950/20 dark:hover:to-teal-950/20"
                            } ${
                              subItem.isActive
                                ? "bg-gradient-to-r " +
                                  (index === 0
                                    ? "from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40"
                                    : "from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40")
                                : ""
                            }`}
                          >
                            <Link href={subItem.url} className="flex items-center gap-2 w-full">
                              <div
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  subItem.isActive
                                    ? (index === 0 ? "bg-blue-500" : "bg-emerald-500") +
                                      " shadow-lg"
                                    : "bg-muted-foreground/30 group-hover:" +
                                      (index === 0 ? "bg-blue-400" : "bg-emerald-400")
                                }`}
                              />
                              <span
                                className={`text-sm transition-colors duration-300 ${
                                  subItem.isActive
                                    ? "font-medium " +
                                      (index === 0
                                        ? "text-blue-700 dark:text-blue-300"
                                        : "text-emerald-700 dark:text-emerald-300")
                                    : "text-muted-foreground group-hover:text-foreground"
                                }`}
                              >
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pt-4">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
