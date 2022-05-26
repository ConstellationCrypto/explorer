// PM2 ecosystem file

// Verify environment variables are set
const required_vars = [
    "DATABASE_URL",
    "SECRET_KEY_BASE",
    "ETHEREUM_JSONRPC_HTTP_URL",
    "COIN",
    "NETWORK",
    "SUBNETWORK",
    "BLOCKSCOUT_HOST"
]

const unset_vars = required_vars.filter((item) => !process.env[item])
if(unset_vars.length > 0) {
    console.error("Required environment variables are not set")
    console.error(unset_vars)
    process.exit(1)
}

let apps = [
    {
        name: "Blockscout",
        script: "MIX_ENV=prod PORT=4000 mix phx.server"
    },
    {
        name: "Caddy reverse-proxy",
        script: `sudo caddy reverse-proxy --from ${process.env.BLOCKSCOUT_HOST} --to 127.0.0.1:4000`
    }
]

module.exports = {
    apps
}
