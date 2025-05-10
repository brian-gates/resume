This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Production Management with PM2

This project includes configuration for [PM2](https://pm2.keymetrics.io/), a production process manager for Node.js applications.

To manage the production application:

```bash
# Start the application
pnpm pm2:start

# Check status
pnpm pm2:status

# View logs
pnpm pm2:logs

# Monitor CPU/Memory usage
pnpm pm2:monit

# Restart the application
pnpm pm2:restart

# Stop the application
pnpm pm2:stop
```

The PM2 configuration is stored in `ecosystem.config.js` and can be modified to adjust settings like memory limits, instance count, or environment variables.
