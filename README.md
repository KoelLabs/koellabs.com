<img width="100%" alt="KoelLabsLogoLong" src="https://github.com/user-attachments/assets/b8232261-eb8f-40a8-a33e-630eca206c9f">

[![Mozilla Builders](https://img.shields.io/badge/Mozilla-000000.svg?style=for-the-badge&logo=Mozilla&logoColor=white)](https://future.mozilla.org/builders/)
![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# Koel Labs - Web Application

Contains the website for Koel Labs and web interface for the pronunciation learning application.

Read about all our repositories [here](https://github.com/KoelLabs).

## Local Development

### Run with Docker (Recommended)

0. `git clone https://github.com/KoelLabs/webapp.git`
1. Install Docker and Docker Compose
   - [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/) or `brew cask install docker` with [Homebrew](https://brew.sh/)
     - If it repeatedly complains about the daemon not running, make sure Docker Desktop is running and add `export DOCKER_HOST=unix:///Users/$USER/Library/Containers/com.docker.docker/Data/docker.raw.sock` to your shell profile (e.g. `~/.zshrc`)
   - [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) or `choco install docker-desktop` with [Chocolatey](https://chocolatey.org/)
   - [Docker Engine for Linux](https://docs.docker.com/engine/install/) or `sudo apt install docker.io` with APT on Ubuntu
2. Duplicate the `.env.example` file and rename it to `.env.local`. Fill in the necessary environment variables.
3. Run the application
   - `. ./scripts/docker-run-dev.sh` to start the development server
   - `ctrl+c` to stop the server or `. ./scripts/docker-stop-dev.sh` if you've closed the terminal

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
4. Create a new database
   - `createdb koellabs` with PostgreSQL
5. Install dependencies
   - `npm install` or `npm ci` for a clean install from the package-lock.json
6. Duplicate the `.env.example` file and rename it to `.env.local`. Fill in the necessary environment variables.
7. Run the application
   - `npm run dev` to start the development server
   - `ctrl+c` to stop it

### Formatting, Linting, Automated Tests and Secret Scanning

All will run automatically via GitHub Actions on every push to the repository. You can also run them locally:

- `npm run format` to format the code with Prettier, ESLint and Fixpack
- `npm run lint` to lint the code with Next.js ESLint and Prettier
- `npm run test` to run the automated tests with Node Test Runner
- `npm run scan` to scan the code for secrets with GitLeaks

Formatting can be set to happen automatically on save in your editor. For VS Code, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension and add `"editor.formatOnSave": true` to your settings.

### Migrations

When you have made changes to the schema in `db/schema.sql`, you will need to make new migration files with `npm run makemigrations`. Everyone will need to apply them with `npm run migrate` to update their local database. The production database will be updated automatically when the migration files are deployed. Migration files are immutable and should not be edited once created.

### File Structure

TODO: Actually fill this out.

```
webapp/
├── public/                 # Static assets to be served
├── src/                    # Source files
│   ├── components/         # React components
│   ├── pages/              # Next.js pages
│   ├── styles/             # CSS styles
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point
│   └── theme.ts            # Theme configuration
├── scripts/                # Shell scripts
├── .env.example            # Example environment variables
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore rules
├── .prettierrc.js          # Prettier configuration
├── Dockerfile              # Docker configuration
├── LICENSE                 # License information
├── README.md               # Readme
├── package-lock.json       # Lock file
├── package.json            # NPM configuration
└── tsconfig.json           # TypeScript configuration
```

## Deployment

TODO: Alex will setup CI/CD with GitHub Actions.

## Contributing

TODO: Alex will add contribution guidelines and PR template/consent form.

## License

Application code and prompts are open-sourced under the [FSL-1.1-Apache-2.0](https://fsl.software/).

We retain all rights to the Koel Labs brand, logos, blog posts and website content.
