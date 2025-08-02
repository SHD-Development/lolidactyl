const appConfig = {
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
      title: "Brian0901ThePro",
      description: "高性能TS魔法少女貓娘，適合個人和企業使用。",
      imageUrl:
        "https://cdn.discordapp.com/avatars/810409750625386497/6f018500ceb0fb97ff63a50aceb89c18.png?size=4096",
      linkUrl: "",
      isActive: true,
    },
    {
      id: 2,
      title: "RynoTheCatgirl",
      description: "店貓娘，非常可愛。",
      imageUrl:
        "https://cdn.discordapp.com/avatars/551019276174229505/c0eb91d693e043401630f209648258e8.png?size=4096",
      linkUrl: "",
      isActive: true,
    },
  ],
};
export default appConfig;
