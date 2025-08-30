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
import { Megaphone, Calendar, Star, ExternalLink, Bell } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import appConfig from "@/config";

interface Announcement {
  id: number;
  title: string;
  content: string;
  color: string;
  date: string;
  isSticky?: boolean;
  link?: string;
}

export function AnnouncementCard() {
  const [announcements] = useState<Announcement[]>(appConfig.announcements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("dashboard.components.announcements");

  const getColorDot = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-500";
      case "green":
        return "bg-green-500";
      case "blue":
        return "bg-blue-500";
      case "yellow":
        return "bg-yellow-500";
      case "purple":
        return "bg-purple-500";
      case "orange":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="bg-zinc-50/80 dark:bg-zinc-900/80 border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">
            {t("title")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((announcement) => {
          const dotColor = getColorDot(announcement.color);
          return (
            <div
              key={announcement.id}
              className={`p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-100/50 dark:bg-zinc-800/50 hover:shadow-md transition-all duration-200 ${
                announcement.isSticky ? "ring-2 ring-amber-500/20" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {announcement.isSticky && (
                    <Star className="h-4 w-4 text-amber-500" />
                  )}
                  <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(announcement.date)}</span>
                </div>
              </div>

              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">
                {announcement.title}
              </h3>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
                {announcement.content}
              </p>

              {announcement.link && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-3"
                    onClick={() => window.open(announcement.link, "_blank")}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {t("learnMore")}
                  </Button>
                </div>
              )}
            </div>
          );
        })}

        <div className="text-center pt-2">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <Bell className="h-3 w-3 mr-1" />
                {t("viewAll")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg">
                    <Megaphone className="h-5 w-5 text-white" />
                  </div>
                  {t("allAnnouncements")}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {announcements.map((announcement) => {
                  const dotColor = getColorDot(announcement.color);
                  return (
                    <div
                      key={announcement.id}
                      className={`p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-100/50 dark:bg-zinc-800/50 hover:shadow-md transition-all duration-200 ${
                        announcement.isSticky ? "ring-2 ring-amber-500/20" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {announcement.isSticky && (
                            <Star className="h-4 w-4 text-amber-500" />
                          )}
                          <div
                            className={`w-2 h-2 rounded-full ${dotColor}`}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(announcement.date)}</span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 text-sm">
                        {announcement.title}
                      </h3>

                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
                        {announcement.content}
                      </p>

                      {announcement.link && (
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7 px-3"
                            onClick={() =>
                              window.open(announcement.link, "_blank")
                            }
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            了解更多
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
