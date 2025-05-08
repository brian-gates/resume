module.exports = {
  apps: [
    {
      name: "briangates-website",
      script: "pnpm",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
