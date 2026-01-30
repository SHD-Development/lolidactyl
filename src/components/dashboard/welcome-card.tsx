"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sun, Moon, Coffee, Star } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import appConfig from "@/config";

export function WelcomeCard() {
  const { data: session } = authClient.useSession();
  const t = useTranslations("dashboard.components.welcome");
  const [greeting, setGreeting] = useState("");
  const [iconName, setIconName] = useState("sun");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        setGreeting(t("morning"));
        setIconName("sun");
        setTimeOfDay("morning");
      } else if (hour >= 12 && hour < 18) {
        setGreeting(t("afternoon"));
        setIconName("coffee");
        setTimeOfDay("afternoon");
      } else if (hour >= 18 && hour < 22) {
        setGreeting(t("evening"));
        setIconName("moon");
        setTimeOfDay("evening");
      } else {
        setGreeting(t("night"));
        setIconName("moon");
        setTimeOfDay("night");
      }
    };

    const updateWelcomeMessage = () => {
      const messages = appConfig.welcomeMessages;
      const randomIndex = Math.floor(Math.random() * messages.length);
      setWelcomeMessage(messages[randomIndex]);
    };

    updateGreeting();
    updateWelcomeMessage();
    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  const getTimeBasedGradient = () => {
    switch (timeOfDay) {
      case "morning":
        return "from-yellow-100 via-orange-50 to-pink-100 dark:from-yellow-950/40 dark:via-orange-950/30 dark:to-pink-950/40";
      case "afternoon":
        return "from-blue-100 via-cyan-50 to-teal-100 dark:from-blue-950/40 dark:via-cyan-950/30 dark:to-teal-950/40";
      case "evening":
        return "from-purple-100 via-pink-50 to-indigo-100 dark:from-purple-950/40 dark:via-pink-950/30 dark:to-indigo-950/40";
      case "night":
        return "from-indigo-200 via-purple-100 to-blue-200 dark:from-indigo-950/50 dark:via-purple-950/40 dark:to-blue-950/50";
      default:
        return "from-blue-100 via-white to-purple-100 dark:from-blue-950/40 dark:via-slate-900/50 dark:to-purple-950/40";
    }
  };

  const getTimeBasedIconGradient = () => {
    switch (timeOfDay) {
      case "morning":
        return "from-yellow-500 to-orange-500";
      case "afternoon":
        return "from-blue-500 to-cyan-500";
      case "evening":
        return "from-purple-500 to-pink-500";
      case "night":
        return "from-indigo-500 to-blue-600";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

  const userName = session?.user?.name || "使用者";

  const getIcon = () => {
    switch (iconName) {
      case "sun":
        return Sun;
      case "coffee":
        return Coffee;
      case "moon":
        return Moon;
      default:
        return Sun;
    }
  };

  const Icon = getIcon();

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary text-primary-foreground rounded-lg">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold truncate">
              {greeting}，{userName}！
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                Lolidactyl
              </Badge>
              <span className="text-sm text-muted-foreground">
                {welcomeMessage}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Image
          src="/images/amamiya.webp"
          alt=""
          width={1920}
          height={1080}
          className="object-cover rounded-lg"
        />
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{t("systemStatus")}</span>
          <span>•</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
