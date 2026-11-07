# Development

This repository serves the public Koel Labs website. Speech practice and accounts are handled by
[Slay Speech](https://slayspeech.com). Core pages build without a database, authentication, or a local
inference server. The optional pronunciation demo calls the hosted feedback service.

## Run locally

Use Node.js 22 (`nvm use` if you use nvm), then:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Optional contact-form settings can be placed in
`.env.local` using `.env.example` as a reference. No environment file is needed to build or browse
public pages.

## Run with Docker

Install Docker with Compose, then:

```sh
npm run docker
```

This starts only the website at [localhost:3000](http://localhost:3000). Stop it with Ctrl+C or
`. ./scripts/docker-stop-dev.sh`. Run a command in the running container with
`. ./scripts/docker-run-dev-cmd.sh <command>`.

## Checks

- `npm run build` runs lint and TypeScript checks, builds the website, and packages the standalone server.
- `npm run lint` checks application lint rules.
- `npm run format` formats repository source.
- `npm run scan` runs the configured secret, dependency, and GitHub Actions security checks.

## Public integrations

The Interspeech blog embeds `/demos/pronunciation/index.html`, a lazy-loaded standalone copy of the
portfolio's Tin Soldier phone demo. It uses the same video, reference audio, recording flow, and
feedback cards, and calls `https://server.koellabs.com/analyze_file`. No server credentials are needed.
Microphone access is requested only when the visitor starts practice. Status messages identify
sample feedback when the service is unavailable. Demo source notes are in
`public/demos/pronunciation/README.md`.

The Interspeech blog uses six SVG figures and a paper hero under `public/blog/interspeech-2026`.
Regenerate the figures with `node scripts/generate-interspeech-figures.mjs`, and the hero with
`node scripts/generate-paper-heroes.mjs`. The figure generator uses the existing OpenRunde
fonts and macOS Arial/Times New Roman (font paths can be overridden via `FIGURE_*_FONT`). The hero
reuses `/images/paper.png` from the research page. Its PNG export is required for social previews;
the article and blog cards use SVG. Superseded raster figures are not kept.

The SLT blog uses focused SVG charts under `public/blog/slt-2026`. Regenerate them with
`python3 scripts/generate-slt-figures.py` (requires Matplotlib and Brotli). Its downloadable
`chart-data.json` stores the plotted aggregates, corrected Table II values, filtering conventions,
source URLs, and source-file hashes. The charts keep the paper's fixed accent comparisons and
distinguish filtered trend scores from unbounded degradation scores. The shared paper-hero script
also generates the SLT hero from the research page's existing `/images/paperSLT.png`.

The research leaderboard reads aggregate results from the public Hugging Face Space through
`/api/leaderboard`. Successful results are cached for an hour; failed initial reads use
`lib/leaderboard-snapshot.json`. The website keeps its own table styling and sorting. The leaderboard
blog preview and `/api/leaderboard/image` share this source so its hero and social image stay current.
The image endpoint reuses the original artwork and replaces only the ranking labels. The article
uses `?variant=hero`; the default thumbnail retains its original title. Its OpenType font is a format
conversion of the existing `OpenRunde-Medium.woff2`, used because the PNG renderer cannot read WOFF2.
No Hugging Face token or private evaluation data is needed. The integration uses Gradio's
`get_leaderboard_view` call with `[["Average"], "FER"]` and validates the returned desktop table.
If the Space changes its API or columns, update `lib/leaderboard-server.ts` and `lib/leaderboard.ts`.

`/privacy` and `/terms` fetch their Markdown from `KoelLabs/.github` at request time and render it
on the website. GitHub remains the source of truth, so document edits do not require a rebuild.

The contact page uses `/api/submitGoogleFormWithReCaptcha`, which verifies reCAPTCHA and submits
the form to the configured Google Form. Set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` at build time and
`RECAPTCHA_PRIVATE_KEY` and `CONTACT_FORM_URL` in the deployed server environment to enable it.

## Deployment

Pushes and merged pull requests to `main` deploy through the Azure Static Web Apps workflow.
Pull requests receive preview deployments. Azure selects Node.js 22 from `package.json`.
The workflow does not fetch the retired inference-server submodule.

Run `npm run build` before deploying. The build creates `.next/standalone` and copies the static
assets into it. The site does not require database migrations or account credentials.
Legacy `/dashboard` URLs redirect to [Slay Speech](https://slayspeech.com); account and onboarding
routes have been removed.
