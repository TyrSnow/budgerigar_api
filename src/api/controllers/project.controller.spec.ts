import { expect, assert } from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';

import app from '../../app';

let request;

describe('Test regist', () => {
  before(() => {
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

  after(() => {
    mongoose.disconnect();
  });
});
