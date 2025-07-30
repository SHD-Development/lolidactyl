"use client";
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";

export const Locale = () => {
  useEffect(() => {
    if (!getCookie("NEXT_LOCALE")) {
      const browserLocale = navigator.language.toLowerCase();
      setCookie("NEXT_LOCALE", browserLocale);
      window.location.reload();
    }
  }, []);

  return null;
};
