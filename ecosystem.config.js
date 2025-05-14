module.exports = {
  apps: [
    {
      name: "briangates-website",
      script: "pnpm",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: true,
      watch_delay: 1000,
      ignore_watch: ["node_modules", ".git", ".next/cache"],
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_staging: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
