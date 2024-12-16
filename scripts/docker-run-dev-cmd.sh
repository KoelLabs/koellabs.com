#!/bin/bash

docker build --tag 'scripts-webapp' -f ./scripts/Dockerfile.dev .

docker run -t -i -p 3000:3000 -v .:/app -v /app/node_modules/ --env-file .env.local 'scripts-webapp' $@
