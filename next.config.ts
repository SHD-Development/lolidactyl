import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import appConfig from "./src/config";

function extractImageDomains() {
  const domains = new Set<string>();

  appConfig.ads.forEach((ad) => {
    if (ad.imageUrl && ad.imageUrl.startsWith("http")) {
      try {
        const url = new URL(ad.imageUrl);
        domains.add(url.hostname);
      } catch (error) {
        console.warn(`Invalid image URL: ${ad.imageUrl}`);
      }
    }
  });

  return Array.from(domains);
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: extractImageDomains().map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
