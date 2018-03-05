yarn install
pm2 stop "budgerigar_api"
pm2 start build/server.js --name="budgerigar_api"
exit