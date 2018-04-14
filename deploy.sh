yarn install
pm2 stop "budgerigar_api"
ENABLE_NODE_LOG=YES pm2 start build/server.js --name="budgerigar_api"
exit
