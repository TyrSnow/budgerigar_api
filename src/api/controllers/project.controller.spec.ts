import { expect, assert } from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';

import { getRequest, releaseRequest } from '../../app.spec';
import { Server } from 'http';

let request;

describe('Test create', () => {
  before(() => {
    request = getRequest();
  });

  it('should return 401 when no auth header', (done) => {
    request
      .post('/api/projects')
      .set('authorization', '')
      .expect(401)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  it('should return 401 when post nothing', (done) => {
    request
      .post('/api/projects')
      .expect(401)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  after(() => {
    releaseRequest();
  });
});
