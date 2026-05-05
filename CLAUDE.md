# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This is Joseph Ball's personal resume site, served via GitHub Pages from the repo root (`https://jball963.github.io/`). It is a static site — no build step, no package manager, no test suite. Pushing to `main` deploys.

The site is based on the [Start Bootstrap Resume v7.0.6](https://startbootstrap.com/theme/resume) theme. `css/styles.css` and `js/scripts.js` are the upstream theme files (mostly unmodified vendor Bootstrap + theme overrides). Resume content lives in `index.html`.

## Working in this repo

- **Local preview:** open `index.html` directly in a browser, or run a static server (`python -m http.server`) from the repo root. There is no dev server, watcher, or hot reload.
- **Editing content:** the resume is a single page. Each section (`#about`, `#education`, `#skills`, `#projects`, `#interests`, `#awards`) is a `<section class="resume-section">` block in `index.html`. The left-side nav in `#sideNav` must be kept in sync with section IDs — `js/scripts.js` wires up Bootstrap's ScrollSpy against `#sideNav`, so a missing/mistyped ID silently breaks scroll highlighting.
- **Images:** drop into `assets/img/`. Project thumbnails referenced from `index.html` follow the `gameN.jpg` / `appN.jpg` naming pattern.
- **Resume PDF:** `assets/resume.pdf` is the file served by the "Download Resume" button (force-renamed to `JosephBallResume.pdf` via the `download` attribute).
- **Avoid editing `css/styles.css`:** it's the bundled Bootstrap + theme stylesheet (~250KB). Prefer adding overrides at the bottom of the file or inline rather than modifying vendor rules.

## Deployment

GitHub Pages serves directly from `main`. Any commit to `main` is live within a minute or so — there is no staging environment. Treat `main` accordingly.
