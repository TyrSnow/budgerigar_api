import app from './app';
import config from './config';

// 启动服务器
app.listen(config.PORT, () => {
  console.log('Server start at port: ', config.PORT)
});
