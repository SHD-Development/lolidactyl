"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  Coins,
  Droplets,
  Settings2,
  Sun,
  Moon,
  Languages,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "next-view-transitions";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US, TW, CN } from "country-flag-icons/react/3x2";
import { useTransitionRouter } from "next-view-transitions";
import { getCookie, setCookie } from "cookies-next";

interface UserInfo {
  coins: number;
  panelId: number;
}

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    image: string;
  };
}) {
  const { isMobile } = useSidebar();
  const t = useTranslations("navUser");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [locale, setLocale] = useState<string>("");
  const router = useTransitionRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/userinfo");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (storedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    const cookieLocale = getCookie("NEXT_LOCALE");
    if (cookieLocale) {
      setLocale(cookieLocale as string);
    } else {
      const browserLocale = navigator.language.toLowerCase();
      setLocale(browserLocale);
      setCookie("NEXT_LOCALE", browserLocale);
    }
  }, [router]);

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    const newTheme = checked ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", checked);
  };

  const changeLanguage = (value: string) => {
    setLocale(value);
    setCookie("NEXT_LOCALE", value);
    window.location.reload();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-xl border bg-white/95 backdrop-blur-xl dark:bg-zinc-900/95 shadow-2xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-4 py-3 text-left text-sm border-b border-zinc-200 dark:border-zinc-700">
                <Avatar className="h-10 w-10 rounded-xl">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup className="p-2">
              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer group">
                <div className="flex items-center justify-center size-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all duration-300 group-hover:scale-110">
                  <Droplets className="h-4 w-4 text-emerald-600 dark:text-emerald-400 transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                    {t("droplets")}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
                    {loading ? (
                      <div className="flex items-center gap-1">
                        <LoaderCircle className="h-3 w-3 animate-spin" />
                        <span>{t("loading")}</span>
                      </div>
                    ) : (
                      <span className="font-medium">
                        {userInfo?.coins?.toFixed(2) || "0.00"}
                      </span>
                    )}
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <div className="border-t border-zinc-200 dark:border-zinc-700 p-2 space-y-1">
              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <Sun className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                  aria-label="Toggle dark mode"
                />
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <div>
                  <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Languages className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div
                    className="flex flex-1 items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Select value={locale} onValueChange={changeLanguage}>
                      <SelectTrigger className="h-8 w-32 border-zinc-300 dark:border-zinc-600">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="en">
                            <div className="flex items-center gap-1">
                              <US className="h-3 w-4" /> English
                            </div>
                          </SelectItem>
                          <SelectItem value="zh-tw">
                            <div className="flex items-center gap-1">
                              <TW className="h-3 w-4" /> 繁體中文
                            </div>
                          </SelectItem>
                          <SelectItem value="zh-cn">
                            <div className="flex items-center gap-1">
                              <CN className="h-3 w-4" /> 简体中文
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-700 p-2">
              <Link href="/auth/logout" prefetch={false}>
                <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950/30">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{t("logout")}</span>
                </DropdownMenuItem>
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
