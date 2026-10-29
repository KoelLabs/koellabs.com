#!/bin/bash

docker compose -f ./scripts/docker-compose.dev.yaml exec webapp "$@"
