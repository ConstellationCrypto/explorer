// PM2 ecosystem file

let apps = [
  {
    name   : "block_scout_web",
    script : "cd apps/block_scout_web && PORT=4000 MIX_ENV=prod mix phx.server"
  },
  {
    name   : "ethereum_jsonrpc",
    script : "_build/prod/rel/ethereum_jsonrpc/bin/ethereum_jsonrpc start"
  },
  {
    name   : "explorer",
    script : "_build/prod/rel/explorer/bin/explorer start"
  },
  {
    name   : "Caddy reverse proxy",
    script : "echo TODO"
  }
]

if (process.env.DISABLE_INDEXER !== "true") {
  apps.push({
    name: "indexer",
    script: "_build/prod/rel/indexer/bin/indexer start"
  })
}

module.exports = {
  apps
}
