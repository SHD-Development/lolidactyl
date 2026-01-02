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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-primary text-primary-foreground rounded-lg">
            <Zap className="h-5 w-5" />
          </div>
          <span>{t("title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            const isPrimary = action.variant === "default";
            return (
              <Button
                key={index}
                variant={action.variant}
                className="h-auto p-4 justify-start w-full"
                onClick={action.onClick}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-primary text-primary-foreground rounded-lg">
                    <Icon className="h-4 w-4 flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
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
