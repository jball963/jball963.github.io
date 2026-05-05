# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

Joseph Ball's personal resume site at https://jball963.github.io/. Built with **Next.js 15 (App Router)** in **plain JavaScript** (no TypeScript), exported as static HTML via `output: 'export'` so GitHub Pages can serve it. Single-page resume — no routing beyond `/`.

## Commands

- `npm install` — install dependencies (first time, or when `package-lock.json` changes)
- `npm run dev` — local dev server at http://localhost:3000
- `npm run build` — produce the static export in `./out/`
- `npm run lint` — Next.js's default lint

There are no tests.

## Architecture

- The home page is [app/page.js](app/page.js), which composes section components from [app/components/](app/components/): `Nav`, `Hero`, `About`, `Skills`, `Experience`, `Contact`, `Footer`. Each is a server component (no `"use client"`) and renders straight HTML — no client-side state anywhere.
- **Skills and Experience are data-driven.** `SKILL_GROUPS` in [app/components/Skills.js](app/components/Skills.js) and `ROLES` in [app/components/Experience.js](app/components/Experience.js) are arrays at the top of the file mapped over to render JSX. To update either section, edit the array — don't restructure the markup.
- **Metadata** (title, description, Open Graph, Twitter Card) is declared in [app/layout.js](app/layout.js) via Next.js's [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata). Don't add `<head>` tags manually in components — they won't apply.
- **Styles**: one global stylesheet at [app/globals.css](app/globals.css), plain CSS, no CSS Modules / Tailwind / styled-components. Selectors match what the page renders directly.
- **Static assets** (resume PDFs, images) live in [public/assets/](public/assets/) and are served at `/assets/...`. The `public/` prefix is dropped in URLs by Next.js convention.

## Deploy pipeline

- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) is the only deploy mechanism. Pushes to `main` run `next build` and upload `./out/` as a Pages artifact via `actions/upload-pages-artifact` + `actions/deploy-pages`. The whole job takes ~30s.
- GitHub Pages source is **"GitHub Actions"** (auto-configured by `actions/configure-pages` on first run — the legacy "Deploy from a branch" mode is no longer used).
- There is no preview environment. Pushes to `main` go directly live within ~1 minute; the previous deploy keeps serving until the new artifact replaces it, so a failed build never takes the site down.

## Limits worth knowing before suggesting changes

- Static export means **no API routes, no SSR, no `getServerSideProps`** — the runtime is pure static HTML/CSS/JS in a browser. `next/image` is configured with `unoptimized: true` for the same reason.
- For anything dynamic (contact form submissions, auth, dynamic data), the site would need a separate hosted backend or a move off GitHub Pages. A previous attempt at a Cloudflare Worker contact form was reverted because GitHub Pages alone can't host the Worker — see commit history for context.
