module.exports = {
  apps: [
    {
      name: "briangates-website",
      script: "server.js",
      instances: 2,
      exec_mode: "cluster",
      // Rolling reload: PM2 waits for each new worker's `ready` signal (emitted
      // by server.js once it is listening) before killing the old worker.
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
      autorestart: true,
      // No file watching in production — the deploy controls restarts. Leaving
      // watch on causes the app to bounce repeatedly while a build writes files.
      watch: false,
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
