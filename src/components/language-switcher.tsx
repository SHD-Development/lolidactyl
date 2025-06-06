"use client";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { US, TW, CN } from "country-flag-icons/react/3x2";
export const LanguageSwitcher = () => {
  const [locale, setLocale] = useState<string>("");
  const router = useTransitionRouter();
  useEffect(() => {
    const cookieLocale = getCookie("NEXT_LOCALE");
    if (cookieLocale) {
      setLocale(cookieLocale as string);
    } else {
      const browserLocale = navigator.language.toLowerCase();
      setLocale(browserLocale);
      setCookie("NEXT_LOCALE", browserLocale);
      window.location.reload();
    }
  }, [router]);
  const t = useTranslations();
  return (
    <div>
      <Select
        value={locale}
        onValueChange={(value) => {
          setLocale(value);
          setCookie("NEXT_LOCALE", value);
          window.location.reload();
        }}
      >
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("common.languages")}</SelectLabel>
            <SelectItem value="en">
              <US /> English (US)
            </SelectItem>
            <SelectItem value="zh-tw">
              <TW /> 繁體中文 (臺灣)
            </SelectItem>
            <SelectItem value="zh-cn">
              <CN /> 简体中文 (中国)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
