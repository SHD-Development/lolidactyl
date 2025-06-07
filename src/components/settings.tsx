import { LuSettings2 } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import ThemeSwitch from "./theme-switch";
export default function Settings() {
  const t = useTranslations("settings");
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-gray-200 hover:bg-gray-300 dark:bg-zinc-950 dark:hover:bg-zinc-800 hover:scale-105 rounded-full ring-2 ring-gray-400 hover:ring-gray-500 dark:ring-white/50 dark:hover:ring-white transition-all duration-200 w-12 h-12 flex justify-center items-center absolute bottom-8 right-8">
            <LuSettings2 className="w-5 h-5" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
          </DialogHeader>
          <ThemeSwitch />
          <LanguageSwitcher />
        </DialogContent>
      </Dialog>
    </>
  );
}
