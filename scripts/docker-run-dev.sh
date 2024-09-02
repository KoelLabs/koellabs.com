#!/bin/bash

open http://localhost:3000 || start chrome \"http://localhost:3000\" || google-chrome 'http://localhost:3000' || echo 'Could not open browser automatically. Please open http://localhost:3000 manually'
docker-compose -f ./scripts/docker-compose.dev.yaml up -d
docker-compose -f ./scripts/docker-compose.dev.yaml logs -f
. ./scripts/docker-stop-dev.sh
