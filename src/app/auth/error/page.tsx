"use client";

import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Link } from "next-view-transitions";
import { useTranslations } from "next-intl";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const t = useTranslations("auth.error");

  const getErrorInfo = (errorType: string | null) => {
    switch (errorType) {
      case "AccessDenied":
        return {
          title: t("accessDenied.title"),
          description: t("accessDenied.description"),
          suggestion: t("accessDenied.suggestion"),
        };
      case "Configuration":
        return {
          title: t("configuration.title"),
          description: t("configuration.description"),
          suggestion: t("configuration.suggestion"),
        };
      case "Verification":
        return {
          title: t("verification.title"),
          description: t("verification.description"),
          suggestion: t("verification.suggestion"),
        };
      default:
        return {
          title: t("default.title"),
          description: t("default.description"),
          suggestion: t("default.suggestion"),
        };
    }
  };

  const errorInfo = getErrorInfo(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl text-destructive">
            {errorInfo.title}
          </CardTitle>
          <CardDescription className="text-base">
            {errorInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            {errorInfo.suggestion}
          </p>

          <div className="flex flex-col gap-3">
            <Button asChild variant="default" className="w-full">
              <Link href="/auth/login">
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("retryLogin")}
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                {t("returnHome")}
              </Link>
            </Button>
          </div>

          {error && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                {t("technicalDetails")}
              </summary>
              <div className="mt-2 rounded-md bg-muted p-3">
                <code className="text-xs text-muted-foreground">
                  {t("errorCode")}: {error}
                </code>
              </div>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
