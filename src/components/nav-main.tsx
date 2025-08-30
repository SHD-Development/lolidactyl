"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "next-view-transitions";
import { useTranslations } from "next-intl";
export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      isActive?: boolean;
    }[];
  }[];
}) {
  const t = useTranslations("sidebar");
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-2">
        {t("platform")}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {items.map((item, index) => (
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
                  {item.items?.map((subItem, subIndex) => (
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
                        <Link
                          href={subItem.url}
                          className="flex items-center gap-2 w-full"
                        >
                          <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              subItem.isActive
                                ? (index === 0
                                    ? "bg-blue-500"
                                    : "bg-emerald-500") + " shadow-lg"
                                : "bg-muted-foreground/30 group-hover:" +
                                  (index === 0
                                    ? "bg-blue-400"
                                    : "bg-emerald-400")
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
  );
}
