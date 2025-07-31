"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Droplets, Server, ExternalLink, KeyRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserInfo {
  coins: number;
  panelId: number;
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
    expireAt: string;
    autoRenew: boolean;
    createAt: string;
    _id: string;
  }>;
}

export function UserCard() {
  const { data: session } = useSession();
  const t = useTranslations("userCard");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

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

    if (session?.user) {
      fetchUserInfo();
    }
  }, [session]);

  if (!session?.user) {
    return null;
  }

  const { user } = session;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-500" />
          {t("title", { defaultValue: "用戶資訊" })}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="text-lg">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-lg leading-none">
              {user.name || t("unknownUser", { defaultValue: "未知用戶" })}
            </h3>
            <div className="">
              <p className="text-sm text-muted-foreground">
                Discord ID:{" "}
                {user.id || t("unknownId", { defaultValue: "未知" })}
              </p>
              {userInfo?.panelId && (
                <p className="text-sm text-muted-foreground">
                  Panel ID: {userInfo.panelId}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">
                {t("droplets", { defaultValue: "Droplets" })}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-blue-500/10 text-blue-700 dark:text-blue-300"
            >
              {loading ? "..." : userInfo?.coins?.toLocaleString() || "0"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("dropletsDescription", {
              defaultValue: "您的貨幣餘額",
              balance: userInfo?.coins || 0,
            })}
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">
                {t("servers", { defaultValue: "伺服器" })}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            >
              {loading ? "..." : userInfo?.servers?.length || 0}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("serversDescription", {
              defaultValue: "您目前擁有的伺服器數量",
              count: userInfo?.servers?.length || 0,
            })}
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="default"
              size="sm"
              className="w-full bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-600 hover:to-blue-700 text-white"
              onClick={() => window.open("/go/panel", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {t("goToPanel", { defaultValue: "前往面板" })}
            </Button>
            <Button variant="secondary" size="sm" className="w-full">
              <KeyRound className="h-4 w-4 mr-2" />
              {t("resetPassword", { defaultValue: "重設密碼" })}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
