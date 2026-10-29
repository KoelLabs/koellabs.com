# Development

This repository serves the public Koel Labs website. Speech practice and accounts are handled by
[Slay Speech](https://slayspeech.com). The website has no database, authentication, or inference-server dependency.

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
