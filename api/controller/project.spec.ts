import { expect, assert } from 'chai';
import 'mocha';
import * as supertest from 'supertest';

import { getRequest, getToken } from '../app.spec';

describe('Test create', () => {
  let token;
  let request;
  before(() => {
    request = getRequest();
    token = getToken();
  });

  it('should return 401 when auth head not set', (done) => {
    request
      .post('/api/projects')
      .expect(401)
      .end((err, res) => {
        done();
      });
  });

  it('should return 400 when name not exist', (done) => {
    request
      .post('/api/projects')
      .set({
        authorization: token,
      })
      .expect(400)
      .end((err, res) => {
        done();
      });
  });
});
