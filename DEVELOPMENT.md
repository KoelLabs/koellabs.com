# Development

## Setup

### Run with Docker (Recommended)

0. `git clone --recurse-submodules https://github.com/KoelLabs/webapp.git`
1. Install Docker and Docker Compose
   - [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/) or `brew install --cask docker` with [Homebrew](https://brew.sh/)
     - If it repeatedly complains about the daemon not running, make sure Docker Desktop is running and add `export DOCKER_HOST=unix:///Users/$USER/Library/Containers/com.docker.docker/Data/docker.raw.sock` to your shell profile (e.g. `~/.zshrc`)
   - [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) or `choco install docker-desktop` with [Chocolatey](https://chocolatey.org/)
   - [Docker Engine for Linux](https://docs.docker.com/engine/install/) or `sudo apt install docker.io` with APT on Ubuntu
2. Duplicate the `.env.example` file and rename it to `.env.local` with `cp .env.example .env.local`.
3. Duplicate the `server/.env.example` file and rename it to `server/.env` with `cp server/.env.example server/.env`.
   - You can find your `HF_TOKEN` on your [Settings Page](https://huggingface.co/settings/tokens). It just needs read access to `gated repos`.
4. Run the application
   - `. ./scripts/docker-run-dev.sh` to start the development server (or `npm run docker` if you have Node.js installed)
   - `ctrl+c` to stop the server or `. ./scripts/docker-stop-dev.sh` if you've closed the terminal

Run commands inside the docker container with `. scripts/docker-run-dev-cmd.sh <command>`, e.g., `. scripts/docker-run-dev-cmd.sh npm install react`.
The docker container will also automatically `npm ci` from the package-lock.json and apply migrations when it starts.

### Run directly on your machine

0. `git clone https://github.com/KoelLabs/webapp.git`
1. Install Node.js
   - [Node.js for Mac](https://nodejs.org/en/download/) or `brew install node` with [Homebrew](https://brew.sh/)
   - [Node.js for Windows](https://nodejs.org/en/download/) or `choco install nodejs` with [Chocolatey](https://chocolatey.org/)
   - [Node.js for Linux](https://nodejs.org/en/download/) or `sudo apt install nodejs` with APT on Ubuntu
2. Install PostgreSQL
   - [PostgreSQL for Mac](https://www.postgresql.org/download/macosx/) or `brew install postgresql` with [Homebrew](https://brew.sh/)
   - [PostgreSQL for Windows](https://www.postgresql.org/download/windows/) or `choco install postgresql` with [Chocolatey](https://chocolatey.org/)
   - [PostgreSQL for Linux](https://www.postgresql.org/download/linux/) or `sudo apt install postgresql` with APT on Ubuntu
3. Make sure PostgreSQL is running
   - `brew services start postgresql` with [Homebrew](https://brew.sh/)
   - `sudo service postgresql start` with APT on Ubuntu
4. Create a new database named `postgres` with a user named `postgres` with the password `postgres`
5. Install dependencies
   - `npm install` or `npm ci` for a clean install from the package-lock.json
6. Duplicate the `.env.example` file and rename it to `.env.local` with `cp .env.example .env.local`.
7. [optional] Follow [the instructions](https://github.com/KoelLabs/server) to set up the inference server if you want to run the speech models.
8. Run the application
   - `npm run dev` to start the development server
   - `ctrl+c` to stop it

### Formatting, Linting, Automated Tests and Secret Scanning

All will run automatically via GitHub Actions on every push to the repository. You can also run them locally:

- `npm run format` or `. scripts/docker-run-dev-cmd.sh npm run format` to format the code with Prettier, ESLint and Fixpack
- `npm run lint` or `. scripts/docker-run-dev-cmd.sh npm run lint` to lint the code with Next.js ESLint and Prettier
- `npm run test` or `. scripts/docker-run-dev-cmd.sh npm run test` to run the automated tests with Node Test Runner
- `npm run scan` or `. scripts/docker-run-dev-cmd.sh npm run scan` to scan the code for secrets with GitLeaks and action security vulnerabilities with Zizmor

Formatting can be set to happen automatically on save in your editor. For VS Code, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension and add `"editor.formatOnSave": true` to your settings.

### Migrations

When you have made changes to the schema in `db/schema.sql`, you will need to make new migration files with `npm run makemigrations` or `. scripts/docker-run-dev-cmd.sh npm run makemigrations`. Everyone will need to apply them with `npm run migrate` to update their local database (applied automatically if running with docker-compose). The production database will be updated automatically when the migration files are deployed. Migration files are immutable and should not be edited once created.

### Directory Structure

```
webapp/
├── .github                 # GitHub Actions and issue templates
├── app/                    # Application files
├── components/             # React components
├── data/                   # Postgres database files when running with Docker
├── db/                     # Database schema and utilities
├── migrations/             # Database migration files
├── hooks/                  # React hooks
├── pages/                  # Next.js pages
│   └── api/                # API routes
├── public/                 # Static assets to be served
├── scripts/                # Shell scripts
├── utils/                  # Utility functions
├── editorconfig            # Editor configuration
├── .env.example            # Example environment variables
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── .prettierignore         # Prettier ignore rules
├── .prettierrc             # Prettier configuration
├── components.json         # Component metadata
├── CONTRIBUTING.md         # Contribution guidelines
├── DEVELOPMENT.md          # Development setup
├── drizzle.config.ts       # Drizzle configuration
├── jsconfig.json           # JavaScript configuration
├── LICENSE                 # License information
├── middleware.ts           # Middleware functions (auth)
├── next-env.d.ts           # Next.js environment types
├── next.config.mjs         # Next.js configuration
├── package-lock.json       # Lock file
├── package.json            # NPM configuration
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Readme
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Deployment

The pushes and merged pull requests to the `main` branch will automatically deploy to the production server. Pull requests will automatically be assigned a preview URL hosted via the test server.
