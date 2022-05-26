
// PM2 ecosystem file

let apps = [
    {
        name: "Blockscout",
        script: "MIX_ENV=prod PORT=4000 mix phx.server"
    },
    {
        name: "Caddy reverse-proxy",
        script: "sudo caddy reverse-proxy --from l1-explorer.constellationchain.xyz --to 127.0.0.1:4000"
    }
]

module.exports = {
    apps
}
