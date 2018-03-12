import * as express from 'express'
import * as log4js from 'log4js'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'

// 启动环境
import './start'
import routes from './api/routes'
import config from './config'

let app = express();

// 配置连接日志
let logger = log4js.getLogger('default')
app.use(log4js.connectLogger(logger, {
    level: 'auto',
    format: ':method :url'
}))

// 处理参数
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', routes)

// 后置错误处理
let error = log4js.getLogger('error');
app.use(function (err, req, res, next) {
    if (err.status === 401) {
        return res.status(401).json({
            message: err.message
        })
    }
    error.error(JSON.stringify(err));
    res.status(500).send({
        note: 'Unrecognized Error'
    })
})

// 启动服务器
app.listen(config.PORT, () => {
    console.log('Server start at port: ', config.PORT)
})