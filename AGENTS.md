## Cursor Cloud specific instructions

This is a single Next.js 16 app (personal resume/portfolio site). No database, no Docker, no external services required for core functionality.

### Running the app

```
pnpm dev
```

The site is at `http://localhost:3000`. See `README.md` for PM2-based production commands.

### Lint

Next.js 16 removed the built-in `next lint` CLI command, so `pnpm lint` will fail. Run ESLint directly:

```
npx eslint .
```

### Build

```
pnpm build
```

### Key routes

- `/` — resume page (server-rendered, static)
- `/api/resume.pdf` — PDF download
- `/api/resume.docx` — DOCX download
- `/api/resume.txt` — plain text
- `/api/resume.json` — JSON
- `/api/chat` — AI chat (requires `N8N_WEBHOOK_URL` env var and `NEXT_PUBLIC_ENABLE_CHAT=true`; optional)

### No automated test suite

The project has no test framework or test files. Verify changes via `npx eslint .`, `pnpm build`, and manual testing.
