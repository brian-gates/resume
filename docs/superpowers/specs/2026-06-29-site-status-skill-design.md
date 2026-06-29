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

Source: the self-hosted Umami Postgres database, queried directly over SSH. No HTTP
API, no auth token, no 1Password.

- Umami runs as Docker containers on the host: app `umami-software/umami:3.1.0`,
  database `postgres:16-alpine` (db name `umami`, user `umami`).
- Website id: `27ee491e-7f7b-4eac-972d-454a781f78ba` (public, already in the repo).

### Access

The script SSHes to the host and runs `psql` inside the database container:

```
ssh "$RESUME_SSH_HOST" 'docker exec "$DB_CONTAINER" psql -U umami -d umami -t -A -F"|" -c "<sql>"'
```

- `RESUME_SSH_HOST` — the user's SSH alias for the host. Read from the environment,
  defaulting to `briangates`. The alias (not an address) is the only host-specific
  value the skill carries; addresses/ports/credentials stay out of the repo, per the
  infrastructure doc's public-repo principle.
- `DB_CONTAINER` — discovered dynamically on the host (`docker ps` filtered to the
  umami db container) rather than hardcoded, so a container rename doesn't break it.
- No DB password is needed: `psql` connects locally inside the container as the
  `umami` superuser.

### Schema facts (Umami 3.x, `website_event` table)

- `event_type = 1` is a pageview.
- distinct `session_id` = visitors; distinct `visit_id` = visits.
- `url_path` = page; `referrer_domain` = referrer.
- `created_at` (timestamptz) is used for all time-window filtering with
  `now() - interval '...'`.

### Data pulled

All scoped to `website_id = '27ee491e-...'`:

- **Window stats** for **last 24h**, **last 7d**, and **prior 7d** (the 7 days before
  the last 7d): pageviews (`count(*) FILTER (WHERE event_type=1)`),
  visitors (`count(DISTINCT session_id)`), visits (`count(DISTINCT visit_id)`).
- **Bounce rate** (last 7d): share of visits with a single pageview.
- **Avg visit duration** (last 7d): mean of `max(created_at) - min(created_at)` per
  `visit_id`.
- **Top 5 pages** (last 7d): `url_path` by pageview count.
- **Top 5 referrers** (last 7d): non-empty `referrer_domain` (excluding the site's own
  hostname) by count.

Output: a single JSON object (`{ "windows": {...}, "bounceRate": ..., "avgDuration":
..., "topPages": [...], "topReferrers": [...] }`) on stdout for the skill to
interpret. SSH/query failure prints `{"error": "..."}` and exits non-zero, so the
skill reports the analytics section as unavailable without aborting Part 1.

## Skill behavior (`SKILL.md`)

1. Run `checks.sh`; render the availability table with status icons and an overall verdict.
2. Run `analytics.sh`; if it returned data, produce a short digest:
   - Headline: last-24h and last-7d visitors / pageviews.
   - Week-over-week delta (last 7d vs prior 7d) for visitors and pageviews, as % change.
   - Top 5 pages and top 5 referrers.
   - Bounce rate and average visit time for last 7d.
3. Flag anomalies in plain language, e.g. "visitors down 40% week-over-week",
   "zero pageviews in last 24h — possible tracker outage", or any failed/warned check.
4. If SSH/DB access fails (host unreachable, container not found, `psql` error), the
   analytics section reports "unavailable" with the error, and Part 1 still runs and
   reports normally.

## One-time setup (documented in SKILL.md)

1. An SSH alias for the host reachable without a passphrase prompt (the deploy already
   relies on this). Default alias `briangates`; override with `RESUME_SSH_HOST`.
2. Docker access on the host for the invoking user (already present).

No credentials, tokens, or 1Password configuration are required.

## Error handling

- Network/endpoint failures in Part 1 → per-check ❌ with the error; never aborts the run.
- SSH/DB failure in Part 2 → analytics section degrades to "unavailable" with the
  error; Part 1 results are unaffected.
- Scripts are written to be self-documenting (no inline comments); SKILL.md is the
  module's README, per repo code-style conventions.

## Out of scope (YAGNI)

- Live chat / LLM smoke test.
- Persisting history of runs or trend storage (each run is point-in-time; Umami
  itself holds history).
- Alerting/notifications — the skill prints a report; scheduling is the caller's concern.
- Staging environment checks.
