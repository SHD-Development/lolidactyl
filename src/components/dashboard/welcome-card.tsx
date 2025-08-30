"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sun, Moon, Coffee, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import appConfig from "@/config";

export function WelcomeCard() {
  const { data: session } = useSession();
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
    <Card className="bg-zinc-50/80 dark:bg-zinc-900/80 border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden relative group h-full">
      <CardContent className="p-6 relative z-10 h-full flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`p-3 bg-gradient-to-r ${getTimeBasedIconGradient()} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors truncate">
                {greeting}，{userName}！
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
                <Badge
                  className={`bg-gradient-to-r ${getTimeBasedIconGradient()} text-white shadow-sm text-xs`}
                >
                  Lolidactyl
                </Badge>
                <span className="text-zinc-700 dark:text-zinc-300 text-xs">
                  {welcomeMessage}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/images/amamiya.webp"
          alt=""
          width={1920}
          height={1080}
          className="object-cover rounded-xl"
        />
        <div className="mt-4 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>{t("systemStatus")}</span>
          <span className="text-zinc-400 dark:text-zinc-500">•</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
