import { metadata } from "./app/layout";

const appConfig = {
  metadata: {
    title: "Lolidactyl",
    description:
      "Lolidactyl is an open-source Pterodactyl client area that provides a simple and user-friendly interface with powerful features.",
  },
  limit: {
    cpu: {
      min: 5,
      max: 400,
      step: 5,
      default: 5,
    },
    ram: {
      min: 128,
      max: 16384,
      step: 128,
      default: 128,
    },
    disk: {
      min: 128,
      max: 32768,
      step: 128,
      default: 128,
    },
    databases: {
      min: 0,
      max: 10,
      step: 1,
      default: 0,
    },
    backups: {
      min: 0,
      max: 10,
      step: 1,
      default: 0,
    },
    allocations: {
      min: 0,
      max: 5,
      step: 1,
      default: 0,
    },
  },
  ads: [
    {
      id: 1,
      title: "Lolidactyl",
      description: "幫這個專案點顆星星嗎？",
      imageUrl:
        "https://static.wikia.nocookie.net/windows/images/0/01/GitHub_logo_2013.png/revision/latest?cb=20231201024220",
      linkUrl: "https://github.com/SHD-Development/lolidactyl",
      isActive: true,
    },
    {
      id: 2,
      title: "SHD Community",
      description: "加入我們的 Discord 社群！",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Discord_logo.svg/1920px-Discord_logo.svg.png",
      linkUrl: "https://dc.shdtw.cloud",
      isActive: true,
    },
    {
      id: 2,
      title: "Coffee Host",
      description: "NT$89 起 超便宜 Minecraft 9950X 主機！",
      imageUrl:
        "https://cdn.coffeehost.net/logo.png",
      linkUrl: "https://coffeehost.net",
      isActive: true,
    },
  ],
};
export default appConfig;
