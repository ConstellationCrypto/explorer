// Blockscout monitor script
const { exec } = require("child_process")
const { BLOCKSCOUT_PROCESS_NAME } = require("./config.js")
const fetch = require("node-fetch")

const HEARTBEAT_INTERVAL_SECONDS = 20

let downCounter = 0

const blockScoutHealthy = async () => {
    try {
        const resp = await fetch("http://localhost:4000")
        console.log(resp)
        return resp.status === 200
    } catch(err) {
        console.log(err)
        return false
    }
}

const restartBlockscout = () => {
    exec(`pm2 restart ${BLOCKSCOUT_PROCESS_NAME}`)
}

restartBlockscout()

setInterval(async () => {
    if(!await blockScoutHealthy()) {
        downCounter++
        console.log("Blockscout down", downCounter)
        if(downCounter >= 5) {
            restartBlockscout()
        }
        return
    }
    console.log("Blockscout is healthy...")
    downCounter = 0
}, HEARTBEAT_INTERVAL_SECONDS * 1000)

