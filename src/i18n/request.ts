import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
export default getRequestConfig(async () => {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "en";
  let messages;
  try {
    messages = (await import(`../dictionaries/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../dictionaries/en.json`)).default;
  }

  return {
    locale: messages ? locale : "en",
    messages,
  };
});
