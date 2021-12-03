#!/bin/sh

npm install --verbose
# npm ci --verbose
# npm install --loglevel verbose
# npm install --loglevel silly

exec "$@"