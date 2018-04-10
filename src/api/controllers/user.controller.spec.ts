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

  it('should return 401 before login', (done) => {
    request
      .post('/api/projects')
      .expect(401)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  after(() => {
    mongoose.disconnect();
  });
});