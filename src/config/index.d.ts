interface IDBConfig{
    uri: string
    user: string
    password: string
}
interface ILogConfig {
    appenders: any
    categories: any
    replaceConsole: boolean
}
interface IConfig {
    PORT: number
    secretKey: string
    db: IDBConfig
    log: ILogConfig
}

export default IConfig