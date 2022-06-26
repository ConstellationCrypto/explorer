#!/usr/bin/env bash
# exit on error
set -o errexit

# Initial setup
mix do deps.get, local.rebar --force, deps.compile

# Remove previous assets
mix phx.digest.clean

# Compile project
MIX_ENV=prod mix compile



# Compile assets
cd apps/block_scout_web/assets; npm install && node_modules/webpack/bin/webpack.js --mode production --progress; cd -
cd apps/explorer && npm install; cd -

mix phx.digest

# Build the release and overwrite the existing release directory
cd apps/block_scout_web && MIX_ENV=prod mix release --overwrite; cd -
cd apps/ethereum_jsonrpc && MIX_ENV=prod mix release --overwrite; cd -
cd apps/explorer && MIX_ENV=prod mix release --overwrite; cd -
cd apps/indexer && MIX_ENV=prod mix release --overwrite; cd -
