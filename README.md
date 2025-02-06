<img width="100%" alt="KoelLabsLogoLong" src="https://github.com/user-attachments/assets/fee3d829-6207-439b-bda0-1695562328fa">


[![Mozilla Builders](https://img.shields.io/badge/Mozilla-000000.svg?style=for-the-badge&logo=Mozilla&logoColor=white)](https://future.mozilla.org/builders/)
![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# Koel Labs - Web Application

![Zizmor](https://github.com/KoelLabs/webapp/actions/workflows/zizmor.yml/badge.svg)
![Gitleaks Secret Scanning](https://github.com/KoelLabs/webapp/actions/workflows/gitleaks.yml/badge.svg)
[![Automatic Deploys](https://github.com/KoelLabs/webapp/actions/workflows/azure-static-web-apps-salmon-sky-0a6b6c10f.yml/badge.svg)](https://koellabs.com)

Contains the website for Koel Labs and the web interface for the pronunciation learning application.

Read about all our repositories [here](https://github.com/KoelLabs).

## Setup

See [DEVELOPMENT.md](DEVELOPMENT.md) for how to setup your local development environment. If you just want to run the application locally not for development purposes, follow the instructions below.

0. `git clone https://github.com/KoelLabs/webapp.git`
1. Install [Docker and Docker Compose](https://www.docker.com/get-started/)
2. Duplicate the `.env.example` file and rename it to `.env.local` with `cp .env.example .env.local`.
   - The default values should work to get started. You can optionally change `DEV_LOGIN` to include your username and email.
3. Run the application `. ./scripts/docker-run-dev.sh`

## Contributing

Check out [CONTRIBUTING.md](CONTRIBUTING.md) for specific guidelines on contributing to this repository.

We are grateful for all of [our contributors](ACKNOWLEDGEMENTS.md). If you contribute to this repository and wish to be acknowledged, please add your name to the list in your pull request.

## License

Application code in this repository is open-sourced under the [FSL-1.1-Apache-2.0](https://fsl.software/).

We retain all rights to the Koel Labs brand, logos, blog posts, and website content.
