"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Server,
  Cpu,
  HardDrive,
  Database,
  Calculator,
  MemoryStick,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import axios from "axios";

interface UserInfo {
  coins: number;
  servers: Array<{
    id: number;
    identifier: string;
    status: string;
    resources: {
      cpu: number;
      ram: number;
      disk: number;
      databases: number;
      allocations: number;
      backups: number;
    };
  }>;
}

export function StatsOverview() {
  const { data: session } = useSession();
  const t = useTranslations("dashboard.components.stats");
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
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">{t("loadingError")}</p>
        </CardContent>
      </Card>
    );
  }

  const totalResources = userInfo.servers.reduce(
    (acc, server) => ({
      cpu: acc.cpu + server.resources.cpu,
      ram: acc.ram + server.resources.ram,
      disk: acc.disk + server.resources.disk,
      databases: acc.databases + server.resources.databases,
    }),
    { cpu: 0, ram: 0, disk: 0, databases: 0 }
  );

  const activeServers = userInfo.servers.filter(
    (server) => server.status === "Active"
  ).length;

  return (
    <Card className="bg-zinc-50/80 dark:bg-zinc-900/80 border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">
            {t("title")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="space-y-3">
          <div className="bg-zinc-100/70 dark:bg-zinc-800/70 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-sm">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium truncate">
                  {t("balance")}
                </p>
                <p className="font-bold text-lg text-zinc-900 dark:text-zinc-100 truncate">
                  {userInfo.coins.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-100/70 dark:bg-zinc-800/70 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-sm">
                <Server className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium truncate">
                  {t("activeServers")}
                </p>
                <p className="font-bold text-lg text-zinc-900 dark:text-zinc-100 truncate">
                  {activeServers} / {userInfo.servers.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-100/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-200/50 dark:border-zinc-700/50 shadow-inner">
          <h4 className="font-semibold text-zinc-700 dark:text-zinc-200 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            {t("totalResources")}
          </h4>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {t("totalCpu")}
                </span>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                {totalResources.cpu}%
              </Badge>
            </div>

            <div className="flex justify-between items-center p-3 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {t("totalRam")}
                </span>
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
                {totalResources.ram} MiB
              </Badge>
            </div>

            <div className="flex justify-between items-center p-3 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {t("totalDisk")}
                </span>
              </div>
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm">
                {totalResources.disk} MiB
              </Badge>
            </div>

            <div className="flex justify-between items-center p-3 bg-zinc-100/70 dark:bg-zinc-800/70 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {t("totalDatabases")}
                </span>
              </div>
              <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-sm">
                {totalResources.databases}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
