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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-primary text-primary-foreground rounded-lg">
            <Calculator className="h-5 w-5" />
          </div>
          <span>{t("title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="bg-muted/50 p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 text-white rounded-lg">
                <Droplets className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{t("balance")}</p>
                <p className="font-semibold text-lg truncate">
                  {userInfo.coins.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 text-white rounded-lg">
                <Server className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium truncate">
                  {t("activeServers")}
                </p>
                <p className="font-semibold text-lg truncate">
                  {activeServers} / {userInfo.servers.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4 border">
          <h4 className="font-semibold mb-3">{t("totalResources")}</h4>

          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-background rounded border">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">{t("totalCpu")}</span>
              </div>
              <Badge variant="secondary">{totalResources.cpu}%</Badge>
            </div>

            <div className="flex justify-between items-center p-2 bg-background rounded border">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">{t("totalRam")}</span>
              </div>
              <Badge variant="secondary">{totalResources.ram} MiB</Badge>
            </div>

            <div className="flex justify-between items-center p-2 bg-background rounded border">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">{t("totalDisk")}</span>
              </div>
              <Badge variant="secondary">{totalResources.disk} MiB</Badge>
            </div>

            <div className="flex justify-between items-center p-2 bg-background rounded border">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  {t("totalDatabases")}
                </span>
              </div>
              <Badge variant="secondary">{totalResources.databases}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
