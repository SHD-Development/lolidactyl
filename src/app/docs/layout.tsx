"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Lock, ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("docs");
  const pathname = usePathname();

  const isIndexPage = pathname === "/docs";
  const backHref = isIndexPage ? "/dashboard" : "/docs";
  const backText = isIndexPage
    ? t("index.backToDashboard")
    : t("index.backToHome");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-6">
          <Button asChild variant="ghost" className="gap-2 hover:bg-primary/10">
            <Link href={backHref}>
              <ArrowLeft className="w-4 h-4" />
              {backText}
            </Link>
          </Button>
        </div>

        <Card className="mb-8 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-background shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-1">
                    {t("title")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t("subtitle")}
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="p-1.5 rounded-md bg-blue-500/20 border border-blue-500/30">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="p-1.5 rounded-md bg-green-500/20 border border-green-500/30">
                  <Lock className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-8">{children}</CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </div>
  );
}
