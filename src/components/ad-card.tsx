"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, Megaphone, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import appConfig from "@/config";
import Image from "next/image";

interface Ad {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
}

export function AdCard() {
  const t = useTranslations("adCard");
  const [currentAd, setCurrentAd] = useState<Ad | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const activeAds = appConfig.ads.filter((ad) => ad.isActive);

    if (activeAds.length > 0) {
      const randomIndex = Math.floor(Math.random() * activeAds.length);
      setCurrentAd(activeAds[randomIndex]);
    }
  }, []);

  if (!currentAd) {
    return null;
  }

  const handleAdClick = () => {
    window.open(currentAd.linkUrl, "_blank", "noopener,noreferrer");
  };

  const handleImageClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto cursor-pointer group hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-orange-500" />
            {t("title", { defaultValue: "推薦服務" })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100 group/image">
            <Image
              src={currentAd.imageUrl}
              alt={currentAd.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.style.background =
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
              }}
            />
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover/image:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
              onClick={handleImageClick}
            >
              <div className="text-white text-center space-y-2">
                <Eye className="h-8 w-8 mx-auto" />
                <p className="text-sm font-medium">{t("clickToViewMore")}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {currentAd.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {currentAd.description}
            </p>
          </div>

          <div className="border-t pt-4">
            <Button
              variant="default"
              size="sm"
              className="w-full relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 hover:from-orange-500 hover:via-pink-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 group/btn"
              onClick={handleAdClick}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />

              <div className="relative flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                <span className="relative">
                  {t("learnMore", { defaultValue: "了解更多" })}
                  <div className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-white/80 transition-all duration-300 group-hover/btn:w-full" />
                </span>
              </div>
            </Button>
          </div>

          <div className="text-center">
            <span className="text-xs text-muted-foreground">
              {t("advertisement", { defaultValue: "廣告" })}
            </span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg w-[90vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 break-words pr-6">
              <Megaphone className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <span className="break-words min-w-0">{currentAd.title}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 min-w-0">
            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={currentAd.imageUrl}
                alt={currentAd.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.style.background =
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                }}
              />
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-lg break-words">
                {currentAd.title}
              </h4>
              <div
                className="text-sm text-muted-foreground leading-relaxed"
                style={{
                  wordBreak: "break-all",
                  overflowWrap: "anywhere",
                  whiteSpace: "pre-wrap",
                }}
              >
                {currentAd.description}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDialogOpen(false)}
              >
                {t("close")}
              </Button>
              <Button
                className="flex-1 relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 hover:from-orange-500 hover:via-pink-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 group/btn"
                onClick={() => {
                  handleAdClick();
                  setDialogOpen(false);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />

                <div className="relative flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                  <span className="relative">
                    {t("goToView")}
                    <div className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-white/80 transition-all duration-300 group-hover/btn:w-full" />
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
