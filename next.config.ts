import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import appConfig from "./src/config";
import createMDX from "@next/mdx";

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
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: extractImageDomains().map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};
const withMDX = createMDX({});

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withMDX(nextConfig));
