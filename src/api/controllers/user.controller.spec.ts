import { expect, assert } from 'chai';
import 'mocha';
import * as supertest from 'supertest';

import app from '../../app';

const request = supertest(app);

describe('Test regist', () => {
  it('should return 400 when post nothing', (done) => {
    supertest(app)
      .post('/api/users')
      .expect(400)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  it('should return 400 when password not exist', (done) => {
    supertest(app)
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

  // after(() => {
  //   request.del
  // });
});
