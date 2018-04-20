import { expect, assert } from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';

import app from '../../app';

let request;

describe('Test regist', () => {
  before(() => {
    (<any>mongoose).Promise = global.Promise;
    request = supertest(app);
  });

  it('should return 400 when post nothing', (done) => {
    request
      .post('/api/users')
      .expect(400)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });
  
  it('should return 400 when password not exist', (done) => {
    request
      .post('/api/users')
      .send({
        name: 'tianyu',
      })
      .expect(400)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  // it('should return token when regist ready', (done) => {
  //   request
  //     .post('/api/users')
  //     .send({
  //       name: 'tianyu',
  //       password: '123456',
  //     })
  //     .expect(200)
  //     .end((err, res) => {
  //       console.log(res);
  //       expect(err).not.exist;
  //       done(err);
  //     });
  // });

  after(() => {
    // mongoose.disconnect();
  });
});

// describe('Test valid name', () => {
//   before(() => {
//     request = supertest(app);
//   });

//   it('should return 200', (done) => {
//     request
//       .get('/api/users/names?name=tianyu')
//       .expect(200)
//       .end((err, res) => {
//         console.log(res);
//         expect(err).not.exist;
//         done(err);
//       });
//   });
// });
