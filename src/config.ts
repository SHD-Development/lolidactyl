const appConfig = {
  limit: {
    cpu: {
      min: 5,
      max: 400,
      step: 5,
      default: undefined,
    },
    ram: {
      min: 128,
      max: 16384,
      step: 128,
      default: undefined,
    },
    disk: {
      min: 128,
      max: 32768,
      step: 128,
      default: undefined,
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
};
export default appConfig;
