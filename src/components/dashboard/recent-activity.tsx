"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Server,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import axios from "axios";

interface ServerInfo {
  id: number;
  name: string;
  status: string;
  expiresAt: string;
  autoRenew: boolean;
  createAt: string;
}

interface UserInfo {
  servers: ServerInfo[];
}

interface ActivityItem {
  id: string;
  type: "server_created" | "server_expiring" | "auto_renew";
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export function RecentActivity() {
  const { data: session } = useSession();
  const t = useTranslations("dashboard.components.recentActivity");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!session?.user?.name) return;

      try {
        const response = await axios.get("/api/userinfo");
        if (response.data.status === "success") {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [session]);

  const generateActivities = (servers: ServerInfo[]): ActivityItem[] => {
    const activities: ActivityItem[] = [];
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    servers
      .sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      )
      .slice(0, 3)
      .forEach((server) => {
        activities.push({
          id: `created_${server.id}`,
          type: "server_created",
          title: t("serverCreated"),
          description: `${server.name} ${t("deployedSuccessfully")}`,
          time: formatTimeAgo(server.createAt),
          icon: CheckCircle,
          color: "text-green-500",
        });
      });

    servers
      .filter((server) => {
        const expiresAt = new Date(server.expiresAt);
        return expiresAt > now && expiresAt <= sevenDaysFromNow;
      })
      .slice(0, 3)
      .forEach((server) => {
        activities.push({
          id: `expiring_${server.id}`,
          type: "server_expiring",
          title: t("serverExpiring"),
          description: `${server.name} ${t("willExpireOn")} ${formatDate(
            server.expiresAt
          )} ${t("expiresOn")}`,
          time: t("aboutToExpire"),
          icon: AlertCircle,
          color: "text-orange-500",
        });
      });

    return activities.slice(0, 5);
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return t("justNow");
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} ${t("minutesAgo")}`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} ${t("hoursAgo")}`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} ${t("daysAgo")}`;

    return formatDate(dateString);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("zh-TW", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="h-4 bg-gray-200 rounded w-1/2"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const activities = userInfo ? generateActivities(userInfo.servers) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-primary text-primary-foreground rounded-lg">
            <Clock className="h-5 w-5" />
          </div>
          <span>{t("title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Activity className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
              {t("noActivity")}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => {
              const Icon = activity.icon;
              const isExpiring = activity.type === "server_expiring";
              const isCreated = activity.type === "server_created";

              return (
                <div
                  key={activity.id}
                  className={`p-4 rounded-lg border ${
                    isExpiring
                      ? "bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800"
                      : "bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isExpiring
                          ? "bg-orange-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{activity.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                        {isExpiring && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {t("expiring")}
                          </Badge>
                        )}
                        {isCreated && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs"
                          >
                            {t("created")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
