import * as express from 'express';
import * as log4js from 'log4js';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import './start';
// 启动环境
import routes from './api/routes';

let app = express();

// 配置连接日志
let logger = log4js.getLogger('default');
app.use(log4js.connectLogger(logger, {
  level: 'auto',
  format: ':method :url',
}));

// 处理参数
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// 前置计算response时间
let debug = log4js.getLogger('debug');
app.use((req, res, next) => {
  const startTime = new Date().valueOf(); // 获取时间 t1

  function calResponseTime () {
    const now = new Date().valueOf(); //获取时间 t2
    const deltaTime = now - startTime;
    debug.debug(`[Debug]Request path: ${req.originalUrl}, cost: ${deltaTime}`);
  }

  res.once('finish', calResponseTime);
  res.once('close', calResponseTime);
  next();
});

// 加载路由
app.use('/api', routes);

// 后置错误处理
let error = log4js.getLogger('error');
app.use(function (err, req, res, next) {
  if (err.status === 401) { // 权限问题
    return res.status(401).json({
      message: err.message,
    });
  }

  error.error(err);
  res.status(500).send({
    message: 'Unrecognized Error',
  });
});

process.on('uncaughtException', (err) => {
  console.error('UnCaughtException: ', err);
});

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection: ', err);
});

export default app;
