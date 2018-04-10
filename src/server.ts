import app from './app';
import * as log4js from 'log4js';
import config from './config';

import './start';
// 配置连接日志
let logger = log4js.getLogger('default');
app.use(log4js.connectLogger(logger, {
  level: 'auto',
  format: ':method :url',
}));

// 启动服务器
app.listen(config.PORT, () => {
  console.log('Server start at port: ', config.PORT)
});
