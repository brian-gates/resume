# Site Status Skill — Design

## Purpose

A project-scoped Claude Code skill, `site-status`, invoked routinely to (1) validate
that briangates.me is up and serving its key endpoints, and (2) summarize recent
Umami analytics usage. It produces one consolidated, human-readable report and flags
anomalies.

## Scope

- Production target only: `https://briangates.me`.
- Read-only. No deploys, no mutations to Umami.
- No live chat smoke test (the `/api/chat` path is excluded to avoid per-run LLM cost).

## Location

Committed to the repo so it is versioned and shared:

```
.claude/skills/site-status/
  SKILL.md       # instructions + one-time setup (the module README)
  checks.sh      # availability / functional checks → structured output
  analytics.sh   # Umami fetch → JSON
```

## Part 1 — Availability & functional checks (`checks.sh`)

Runs `curl` against `https://briangates.me`. Each line of output is a status record
the skill renders as ✅ pass / ⚠️ warn / ❌ fail.

| Check | Endpoint | Pass condition |
|---|---|---|
| Home page | `GET /` | HTTP 200 and body contains the sanity string `Brian Gates` |
| Health | `GET /healthz` | HTTP 200 and body is `{"status":"ok"}` |
| Resume PDF | `GET /api/resume.pdf` | HTTP 200, `Content-Type` contains `pdf`, body > 1 KB |
| Resume DOCX | `GET /api/resume.docx` | HTTP 200, `Content-Type` contains `word`/`docx`, body > 1 KB |
| Resume JSON | `GET /api/resume.json` | HTTP 200, `Content-Type` contains `json`, parses as JSON |
| Resume TXT | `GET /api/resume.txt` | HTTP 200, `Content-Type` contains `text`, body non-trivial |
| TLS cert | TLS handshake | warn if certificate expires in < 21 days; fail if already expired |

Output format: one record per check as tab-separated `name<TAB>status<TAB>detail`,
plus a trailing `OVERALL<TAB>pass|warn|fail`. Connection failures (DNS, refused,
timeout) are reported as ❌ with the curl error, not a crash.

## Part 2 — Analytics summary (`analytics.sh`)

Source: self-hosted Umami REST API, served first-party under `/stats`.

- API base: `https://briangates.me/stats/api`
- Website id: `27ee491e-7f7b-4eac-972d-454a781f78ba` (public, already in the repo)

### Auth

Credentials come from 1Password via the CLI, using a service account token in the
environment (`OP_SERVICE_ACCOUNT_TOKEN`):

```
USERNAME=$(op read "op://Private/Umami Admin/username")
PASSWORD=$(op read "op://Private/Umami Admin/password")
```

Then `POST /stats/api/auth/login` with `{username, password}` → bearer `token`, used
as `Authorization: Bearer <token>` on subsequent calls.

### Data pulled

Time windows (epoch-millis ranges computed in the script):

- **Last 24h** and **last 7d**: `GET /websites/{id}/stats?startAt&endAt` →
  pageviews, visitors, visits, bounces, total time.
- **Prior 7d** (the 7 days before the last 7d): same `stats` call, for
  week-over-week comparison. Umami's `stats` endpoint also accepts a comparison
  range, but computing the prior window explicitly keeps the script API-version
  independent.
- **Top pages** (last 7d): `GET /websites/{id}/metrics?type=url&startAt&endAt`.
- **Top referrers** (last 7d): `GET /websites/{id}/metrics?type=referrer&...`.

Output: a single JSON object (`{ "windows": {...}, "topPages": [...],
"topReferrers": [...] }`) printed to stdout for the skill to interpret. Auth or
fetch failure prints `{"error": "..."}` and exits non-zero so the skill reports the
analytics section as unavailable without aborting Part 1.

## Skill behavior (`SKILL.md`)

1. Run `checks.sh`; render the availability table with status icons and an overall verdict.
2. Run `analytics.sh`; if it returned data, produce a short digest:
   - Headline: last-24h and last-7d visitors / pageviews.
   - Week-over-week delta (last 7d vs prior 7d) for visitors and pageviews, as % change.
   - Top 5 pages and top 5 referrers.
   - Bounce rate and average visit time for last 7d.
3. Flag anomalies in plain language, e.g. "visitors down 40% week-over-week",
   "zero pageviews in last 24h — possible tracker outage", or any failed/warned check.
4. If `op` is not configured (no `OP_SERVICE_ACCOUNT_TOKEN`, or `op read` fails),
   the analytics section reports "not configured" with a one-line pointer to setup,
   and Part 1 still runs and reports normally.

## One-time setup (documented in SKILL.md)

1. Install/confirm the 1Password CLI (`op`, already present at v2.33.1).
2. Create a 1Password **service account** scoped to the vault holding the Umami
   login; export `OP_SERVICE_ACCOUNT_TOKEN` in the shell profile.
3. Create a 1Password item `Umami Admin` in the `Private` vault with `username` and
   `password` fields matching the Umami dashboard login.

## Error handling

- Network/endpoint failures in Part 1 → per-check ❌ with the error; never aborts the run.
- Analytics auth/fetch failure → analytics section degrades to "unavailable"/"not
  configured"; Part 1 results are unaffected.
- Scripts are written to be self-documenting (no inline comments); SKILL.md is the
  module's README, per repo code-style conventions.

## Out of scope (YAGNI)

- Live chat / LLM smoke test.
- Persisting history of runs or trend storage (each run is point-in-time; Umami
  itself holds history).
- Alerting/notifications — the skill prints a report; scheduling is the caller's concern.
- Staging environment checks.
