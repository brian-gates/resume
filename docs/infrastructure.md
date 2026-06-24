# Infrastructure & Deployment

> **Scope:** how briangates.me is built, deployed, and instrumented. This is a
> public document — it intentionally contains **no addresses, credentials, port
> maps, or host-specific operational detail**. Those live in a private ops note
> (see [Private operational docs](#private-operational-docs)).

## Architecture

briangates.me is a Next.js app served in production by a small custom Node
server (`server.js`) running under **PM2 in cluster mode** for zero-downtime
rolling reloads (see
[`docs/superpowers/specs/2026-06-21-zero-downtime-deploy-design.md`](./superpowers/specs/2026-06-21-zero-downtime-deploy-design.md)).

The host follows a **single-VM, reverse-proxy** pattern: an Apache front end
terminates TLS and proxies to the app (and to a handful of other small,
path-prefixed Node services that share the box). The Next.js app itself is
process-managed by PM2 (`ecosystem.config.js`), with separate production and
staging instances.

```
Internet ──TLS──▶ Apache (reverse proxy) ──▶ Next.js app (PM2, cluster)
                                          └─▶ other path-prefixed services
```

## Deployment

Deploys run via GitHub Actions (`.github/workflows/deploy.yml`): the workflow
SSHes to the host, updates the per-environment checkout, builds, and triggers a
PM2 rolling reload. `server.js` emits PM2's `ready` signal only once it is
actually listening, and exposes `/healthz`, so a release is verified before
traffic depends on it.

PM2 operations are wrapped as npm scripts — see the **Production Management with
PM2** section of the root `README.md`.

## Analytics

Page analytics use a **self-hosted [Umami](https://umami.is)** instance
(privacy-friendly, cookieless, no consent banner required).

- The tracking tag is rendered in `src/app/layout.tsx`, **production-only**, so
  local-dev traffic never reaches the dashboard.
- It is served **first-party**: the script and its data-collection endpoint are
  reached under the site's own origin (a `/stats/*` path) rather than a
  third-party analytics domain, so privacy/ad blockers don't strip it.
- The `data-website-id` is **public by design** (it ships in the page HTML) and
  is safe to commit. The Umami instance, its database, and its secrets are
  operated separately and are **not** part of this repo.

To add or change the tracked site, register it in the Umami dashboard and update
the website id / first-party path in `src/app/layout.tsx`.

## Private operational docs

Host addresses, the service/port inventory, exposed-service notes, resource
headroom, certificates, and credentials are deliberately **kept out of this
public repository**. They live in the private operational notes on the
infrastructure host. If you maintain this deployment and need that detail,
start there.
