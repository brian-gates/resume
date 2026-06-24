# Analytics

Page analytics via self-hosted [Umami](https://umami.is) — cookieless, no consent
banner, ~5 KB tracker.

## Behavior

`<Analytics />` renders the Umami tracking tag and is a no-op outside production,
so local-dev traffic never reaches the dashboard.

## First-party serving

The tag loads from `/stats/script.js` (this origin), not a third-party analytics
domain, so privacy/ad blockers don't strip it. A reverse proxy configured at the
host layer — **outside this repo** — forwards `/stats` to the Umami backend. The
tracker derives its collect endpoint from the script's own directory, so
`/stats/script.js` posts to `/stats/api/send` automatically; no client config.

## Values

`UMAMI_WEBSITE_ID` is public by design (it ships in the page HTML) and safe to
commit. The Umami instance, its database, and its secrets are operated separately
and are not part of this repo.
