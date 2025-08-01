"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  User,
  Droplets,
  Server,
  ExternalLink,
  KeyRound,
  Copy,
  Check,
} from "lucide-react";
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
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState({
    open: false,
    password: "",
  });
  const [copied, setCopied] = useState(false);
  const [copiedUserId, setCopiedUserId] = useState(false);

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

  const handleResetPasswordClick = () => {
    setConfirmDialog(true);
  };

  const handleResetPassword = async () => {
    setConfirmDialog(false);
    setResetPasswordLoading(true);
    try {
      const response = await axios.patch("/api/resetpassword");
      if (response.data.status === "success") {
        setPasswordDialog({ open: true, password: response.data.password });
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      // You might want to show a toast or error message here
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(passwordDialog.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const copyUserIdToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(user.id || "");
      setCopiedUserId(true);
      setTimeout(() => setCopiedUserId(false), 2000);
    } catch (error) {
      console.error("Failed to copy user ID to clipboard:", error);
    }
  };

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
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={handleResetPasswordClick}
              disabled={resetPasswordLoading}
            >
              <KeyRound className="h-4 w-4 mr-2" />
              {resetPasswordLoading
                ? t("resettingPassword", { defaultValue: "重設中..." })
                : t("resetPassword", { defaultValue: "重設密碼" })}
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t("confirmResetTitle", { defaultValue: "確認重設密碼" })}
            </DialogTitle>
            <DialogDescription>
              {t("confirmResetDescription", {
                defaultValue:
                  "您確定要重設密碼嗎？這將會產生一個新的密碼，舊密碼將無法使用。",
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmDialog(false)}>
              {t("cancel", { defaultValue: "取消" })}
            </Button>
            <Button
              variant="destructive"
              onClick={handleResetPassword}
              disabled={resetPasswordLoading}
            >
              {resetPasswordLoading
                ? t("resettingPassword", { defaultValue: "重設中..." })
                : t("confirmReset", { defaultValue: "確認重設" })}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Display Dialog */}
      <Dialog
        open={passwordDialog.open}
        onOpenChange={(open) => setPasswordDialog({ ...passwordDialog, open })}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t("passwordResetSuccess", { defaultValue: "密碼重設成功" })}
            </DialogTitle>
            <DialogDescription>
              {t("passwordResetDescription", {
                defaultValue: "您的新密碼如下，請妥善保存:",
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {/* User ID Section */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                {t("userId", { defaultValue: "用戶 ID" })}
              </label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <code className="font-mono text-sm">
                  {user.id || t("unknownId", { defaultValue: "未知" })}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyUserIdToClipboard}
                  className="h-8 w-8 p-0"
                >
                  {copiedUserId ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Password Section */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                {t("newPassword", { defaultValue: "新密碼" })}
              </label>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <code className="font-mono text-sm">
                  {passwordDialog.password}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyToClipboard}
                  className="h-8 w-8 p-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setPasswordDialog({ open: false, password: "" })}
            >
              {t("close", { defaultValue: "關閉" })}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
