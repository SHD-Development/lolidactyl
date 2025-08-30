"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Settings,
  FileText,
  ExternalLink,
  Zap,
  MessageCircle,
} from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useTranslations } from "next-intl";

export function QuickActions() {
  const router = useTransitionRouter();
  const t = useTranslations("dashboard.components.quickActions");

  const actions = [
    {
      title: t("createServer"),
      description: t("createServerDesc"),
      icon: Plus,
      onClick: () => router.push("/dashboard/servers/create"),
      variant: "default" as const,
    },
    {
      title: t("manageServers"),
      description: t("manageServersDesc"),
      icon: Settings,
      onClick: () => router.push("/dashboard/servers/manage"),
      variant: "outline" as const,
    },
    {
      title: t("controlPanel"),
      description: t("controlPanelDesc"),
      icon: ExternalLink,
      onClick: () => router.push("/go/panel"),
      variant: "outline" as const,
    },
    {
      title: t("helpDocs"),
      description: t("helpDocsDesc"),
      icon: FileText,
      onClick: () => router.push("/docs"),
      variant: "outline" as const,
    },
    {
      title: t("joinCommunity"),
      description: t("joinCommunityDesc"),
      icon: MessageCircle,
      onClick: () => router.push("https://dc.shdctw.com"),
      variant: "outline" as const,
    },
  ];

  return (
    <Card className="bg-zinc-50/80 dark:bg-zinc-900/80 border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">
            {t("title")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const isPrimary = action.variant === "default";
            return (
              <Button
                key={index}
                variant={action.variant}
                className={`h-auto p-4 justify-start transition-all duration-200 hover:scale-105 ${
                  isPrimary
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg"
                    : "bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border-white/50 dark:border-zinc-600/50 hover:bg-white/80 dark:hover:bg-zinc-700/80"
                }`}
                onClick={action.onClick}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isPrimary
                        ? "bg-white/20"
                        : "bg-gradient-to-r from-purple-500 to-pink-500"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 flex-shrink-0 ${
                        isPrimary ? "text-white" : "text-white"
                      }`}
                    />
                  </div>
                  <div className="text-left">
                    <div
                      className={`font-semibold text-sm ${
                        isPrimary
                          ? "text-white"
                          : "text-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {action.title}
                    </div>
                    <div
                      className={`text-xs ${
                        isPrimary
                          ? "text-white/80"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
