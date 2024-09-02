#!/bin/bash

open http://localhost:3000 || start chrome \"http://localhost:3000\" || google-chrome 'http://localhost:3000' || echo 'Could not open browser automatically. Please open http://localhost:3000 manually'
docker run -t -i -p 3000:3000 -v .:/app --env-file '.env.local' 'koel-webapp-dev'
