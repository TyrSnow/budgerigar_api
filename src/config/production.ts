const config = {
    PORT: process.env.BUDGERIGAR_PORT || 8081,
    secretKey: process.env.BUDGERIGAR_SECRET_KEY,
    db: {
        uri: `mongodb://127.0.0.1:27017/seed${process.env.BUDGERIGAR_DB_COLLECTION}`,
        user: process.env.BUDGERIGAR_DB_USER,
        password: process.env.BUDGERIGAR_DB_PASSWORD
    },
    log: {
        appenders: {
            out: {
                type: 'console'
            },
            app: {
                type: 'file',
                filename: 'logs/access.log',
                maxLogSize: 1024,
                backups: 4
            },
            error: {
                type: 'file',
                filename: 'logs/error.log',
                maxLogSize: 1024,
                backups: 4
            }
        },
        categories: {
            default: {
                appenders: ['out', 'app'],
                level: 'debug'
            },
            error: {
                appenders: ['out', 'error'],
                level: 'debug'
            }
        },
        replaceConsole: true
    }
}

export default config