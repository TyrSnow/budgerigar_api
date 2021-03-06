const config = {
  port: process.env.BUDGERIGAR_PORT || 8081,
  secretKey: process.env.BUDGERIGAR_SECRET_KEY,
  db: {
    uri: `mongodb://127.0.0.1:27017/seed${process.env.BUDGERIGAR_DB_COLLECTION}`,
    user: process.env.BUDGERIGAR_DB_USER,
    password: process.env.BUDGERIGAR_DB_PASSWORD
  },
  upload: {
    temp: 'uploads',
    static: 'D:/nginx-1.12.2/html/',
    prefix: 'medias'
  },
  log: {
    appenders: {
      app: {
        type: 'dateFile',
        filename: 'logs/access',
        patterm: '.yyyy-MM-dd-hh.log',
        alwaysIncludePattern: true,
        maxLogSize: 1024,
        backups: 4
      },
      error: {
        type: 'dateFile',
        filename: 'logs/error',
        patterm: '.yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        maxLogSize: 1024,
        backups: 4
      },
      proxy: {
        type: 'dateFile',
        filename: 'logs/proxy',
        pattern: '.yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        maxLogSize: 1024,
        backups: 4
      },
    },
    categories: {
      default: {
        appenders: ['app'],
        level: 'debug'
      },
      error: {
        appenders: ['error'],
        level: 'debug'
      },
      proxy: {
        appenders: ['proxy'],
        level: 'error',
      },
    },
    replaceConsole: true
  }
}

export default config