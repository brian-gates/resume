module.exports = {
  apps: [
    {
      name: "nextjs",
      script: "pnpm",
      args: "dev",
      env: {
        PORT: 3001,
      },
    },
    {
      name: "keystone",
      script: "pnpm",
      args: "keystone dev",
      env: {
        PORT: 3000,
      },
    },
  ],
};
