import * as express from 'express';
import * as log4js from 'log4js';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import './start';
import { Application } from './core';
import time from './middleware/time';

// 配置连接日志
let logger = log4js.getLogger('default');

class App extends Application {
  private middlewares = [
    log4js.connectLogger(logger, {
      level: 'auto',
      format: ':method :url',
    }),
    bodyParser.json({ limit: '5mb' }),
    bodyParser.urlencoded({ extended: true }),
    time,
  ];

  private errors = [
    function (err, req, res, next) {
      if (err.status === 401) { // 权限问题
        return res.status(401).json({
          message: err.message,
        });
      }
    
      logger.error(err);
      res.status(500).send({
        message: 'Unrecognized Error',
      });
    }
  ]
}

export default App;
