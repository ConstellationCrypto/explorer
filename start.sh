
# Check that env vars are set
[[ -z "${DATABASE_URL}" ]] && echo "DATABASE_URL not set" && exit
[[ -z "${SECRET_KEY_BASE}" ]] && echo "SECRET_KEY_BASE not set" && exit
[[ -z "${ETHEREUM_JSONRPC_HTTP_URL}" ]] && echo "ETHEREUM_JSONRPC_HTTP_URL not set" && exit


export ETHEREUM_JSONRPC_VARIANT=ganache

export COIN=CST
export NETWORK=CST
export SUBNETWORK="Constellation Testnet"

PORT=4000 MIX_ENV=prod mix phx.server
