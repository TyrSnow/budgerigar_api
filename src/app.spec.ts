/**
 * 这边统一生成一个request，不用个controller都生成了
 */
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';

let server: Server;
let request;

before((done) => {
  server = app.listen(3000, () => {
    request = supertest.agent(server);
    done();
  });
});

after((done) => {
  console.log('All test specs complete');
  server.close(() => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        console.log('Env cleared');
        done();
      });
    });
  });
});

export function getRequest() {
  return request;
}
