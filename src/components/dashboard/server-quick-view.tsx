"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, ExternalLink, Calendar, Play, Square } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import axios from "axios";

interface ServerInfo {
  id: number;
  identifier: string;
  name: string;
  status: string;
  expiresAt: string;
  autoRenew: boolean;
  resources: {
    cpu: number;
    ram: number;
    disk: number;
  };
}

interface UserInfo {
  servers: ServerInfo[];
}

export function ServerQuickView() {
  const { data: session } = useSession();
  const t = useTranslations("dashboard.components.serverQuickView");
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

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="h-4 bg-gray-200 rounded w-1/2"></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userInfo || userInfo.servers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Server className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">{t("noServers")}</p>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              {t("createFirst")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentServers = userInfo.servers.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "installing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Play className="h-3 w-3" />;
      case "suspended":
        return <Square className="h-3 w-3" />;
      default:
        return <Server className="h-3 w-3" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-TW", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="bg-zinc-50/80 dark:bg-zinc-900/80 border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg">
            <Server className="h-5 w-5 text-white" />
          </div>
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">
            {t("title")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 relative z-10">
        {recentServers.map((server) => (
          <div
            key={server.id}
            className="p-4 bg-zinc-100/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl space-y-3 hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm truncate flex-1 mr-2 text-zinc-800 dark:text-zinc-100">
                {server.name || server.identifier}
              </h4>
              <Badge
                variant="secondary"
                className={`text-xs font-medium ${getStatusColor(
                  server.status
                )} shadow-sm`}
              >
                {getStatusIcon(server.status)}
                <span className="ml-1">{server.status}</span>
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
              <span className="font-medium">ID: {server.identifier}</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-blue-500" />
                <span>
                  {t("expires")}: {formatDate(server.expiresAt)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 p-2 rounded-lg text-center border border-purple-100 dark:border-purple-800/50">
                <div className="font-medium text-purple-700 dark:text-purple-300">
                  {t("cpu")}
                </div>
                <div className="text-purple-600 dark:text-purple-400">
                  {server.resources.cpu}%
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 p-2 rounded-lg text-center border border-green-100 dark:border-green-800/50">
                <div className="font-medium text-green-700 dark:text-green-300">
                  {t("ram")}
                </div>
                <div className="text-green-600 dark:text-green-400">
                  {server.resources.ram}MiB
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/40 dark:to-red-950/40 p-2 rounded-lg text-center border border-orange-100 dark:border-orange-800/50">
                <div className="font-medium text-orange-700 dark:text-orange-300">
                  {t("disk")}
                </div>
                <div className="text-orange-600 dark:text-orange-400">
                  {server.resources.disk}MiB
                </div>
              </div>
            </div>
          </div>
        ))}

        {userInfo.servers.length > 3 && (
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-white/50 dark:border-slate-600/50 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-200"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {t("viewAll")} {userInfo.servers.length} {t("servers")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
