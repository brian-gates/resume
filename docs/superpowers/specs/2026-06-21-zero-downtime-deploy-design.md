# Zero-downtime deploy via PM2 cluster reload

**Date:** 2026-06-21
**Status:** Approved, implementing
**Scope:** briangates.me deployment (Apache reverse proxy → Next.js on PM2, single DreamCompute VM)

## Problem

The site serves Apache's "Service Unavailable" 503 during every deploy. Apache reverse-proxies
to the Next.js app on `localhost:3000` (prod) / `:3001` (staging). The deploy runs
`pm2 restart` against a single `exec_mode: "fork"` instance — a hard stop → build → boot.
While the single process reboots, Apache gets connection-refused and serves its own 503.

Two compounding footguns make it worse:

1. **`watch: true`** in the PM2 config — PM2's file watcher restarts the app whenever files
   change. The deploy does `git reset --hard`, `pnpm install`, and `pnpm build` *in the live
   directory*, so the watcher bounces the app repeatedly mid-build.
2. **Build-in-place** — the new build is written into the directory PM2 is actively serving.

(The 2026-06-20 outage documented in `INCIDENT-briangates-outage-2026-06-20.md` was a separate
DreamHost infra failure — disk I/O stall + no DHCPv4 lease — not a deploy problem.)

## Goal

A deploy never produces a window where Apache has zero live upstream workers, so the 503 page
never appears. Achieved with PM2 cluster mode + rolling `reload`, gated on a real health check.

## Approach (Level 2 of three considered)

- **Level 1** (rejected as insufficient alone): just `pm2 reload` + disable watch. Shrinks but
  doesn't eliminate the gap with a single instance.
- **Level 2** (chosen): cluster mode, 2 instances, rolling `reload` gated on a `ready` signal +
  health check. One config change + a small entry script. Genuine zero-downtime.
- **Level 3** (deferred): blue-green build-out-of-place + Apache port flip. Adds atomic rollback
  and build-safety; more moving parts. Not needed yet.

## Components

### 1. `server.js` (new, repo root)
Minimal custom Next.js server so PM2 cluster mode has a Node entry script (it cannot cluster
`pnpm start`) and so the worker can announce readiness.

- Boots Next via `next({ dir: __dirname })`, builds an `http.createServer` handler.
- Exposes `GET /healthz` → `200 {"status":"ok"}` *before* delegating to Next's request handler.
- Calls `process.send?.('ready')` **only inside the `listen` callback** — PM2 marks the worker
  online only once it is actually accepting connections.
- Reads `PORT` (default 3000) and `HOSTNAME` from env; honors `NODE_ENV=production`.

### 2. `ecosystem.config.js`
- `script: "server.js"`, `exec_mode: "cluster"`, `instances: 2`.
- `wait_ready: true`, `listen_timeout: 10000`, `kill_timeout: 5000`.
- `watch: false` (removes the mid-deploy bounce).
- Keep `max_memory_restart: "1G"`, `autorestart: true`, env / env_staging PORT values.

### 3. `.github/workflows/deploy.yml`
- The inline `node -e` block that regenerates `ecosystem.config.js` is updated to emit the new
  cluster config (script `server.js`, cluster, 2 instances, `watch:false`, ready/timeout fields).
- `pm2 restart … || pm2 start …` → `pm2 reload … || pm2 start …`. `reload` = rolling worker
  swap; `start` = cold-start fallback on first deploy / when the app isn't registered yet.
- After reload, a health-check loop: `curl -fsS localhost:$PM2_PORT/healthz` retried ~15× at 1s
  intervals. The step fails (non-zero exit) if the new release never reports healthy.

### 4. `package.json`
- `start`: `next start` → `node server.js` so local and production share one entrypoint.
- `dev` unchanged (`next dev`).

## Deploy data flow

```
git pull → pnpm install → pnpm build   (watch:false ⇒ no bounce)
  → pm2 reload ecosystem.config.js
       worker A: spawn new → await 'ready' → kill old A
       worker B: spawn new → await 'ready' → kill old B
  → curl /healthz until 200 (or fail the deploy)
```

Apache always has ≥1 live worker on the port → never serves its 503.

## Known limitation (accepted for Level 2)

Build still happens in the live directory. There is a small window where `.next` is mid-write
while old workers still serve old hashed-asset references — an unlucky in-flight request for a
just-replaced asset could 404. Eliminating this requires build-out-of-place (Level 3). Out of
scope here; documented so it isn't a surprise.

## Testing / verification

- Local: `pnpm build && pnpm start`, confirm `curl localhost:3000/healthz` → 200 and the site
  renders. Run `pm2 start ecosystem.config.js` then `pm2 reload` and watch `pm2 status` show
  workers swap one at a time with no down window.
- The CI health-check loop is itself the production verification gate.
