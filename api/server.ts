import app from './app';
import config from './config';

process.on('uncaughtException', (err) => {
  console.error('UnCaughtException: ', err);
});

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection: ', err);
});

const server = app.listen(config.port, () => {
  console.log('Server start at port: ', config.port);
});

export default server;