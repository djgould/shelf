# Shelf

A reading tracker. Keep a list of what you want to read, what you're reading now, and what you've finished, with ratings and notes.

## Status

Works for one person: every page and action runs as the demo user (Sam Rivera). Next up is letting the rest of the book club keep their own shelves.

## Stack

- Next.js 16 (App Router, server actions)
- Tailwind CSS 4
- Drizzle ORM on libSQL: a local SQLite file in development, Turso in production

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` applies migrations and seeds the demo shelf on first run. `npm run db:setup` does the same on its own. Then open http://localhost:3000.

## Environment

| Variable | Default | Notes |
| --- | --- | --- |
| `DATABASE_URL` | `file:local.db` | libSQL URL. Use the Turso database URL in production. |
| `DATABASE_AUTH_TOKEN` | | Only needed for a remote Turso database. |

## Changing the schema

Edit `db/schema.ts`, run `npm run db:generate` to write a migration to `drizzle/`, then `npm run db:setup` to apply it.

## Deploying

Deploys to Vercel. Set `DATABASE_URL` and `DATABASE_AUTH_TOKEN` in the project's environment variables.
