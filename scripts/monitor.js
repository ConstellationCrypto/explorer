// Blockscout monitor script
const { exec } = require("child_process")
const { BLOCKSCOUT_PROCESS_NAME } = require("./config.js")
const fetch = require("node-fetch")

const HEARTBEAT_INTERVAL_SECONDS = 20

const blockScoutHealthy = async () => {
    try {
        const resp = await fetch("http://localhost:4000")
        return resp.status === 200
    } catch(err) {
        return false
    }
}

const restartBlockscout = () => {
    exec(`pm2 restart ${BLOCKSCOUT_PROCESS_NAME}`)
}

restartBlockscout()

setInterval(async () => {
    if(!await blockScoutHealthy()) {
        console.log("Blockscout down, restarting...")
        restartBlockscout()
        return
    }
    console.log("Blockscout is healthy...")
}, HEARTBEAT_INTERVAL_SECONDS * 1000)

