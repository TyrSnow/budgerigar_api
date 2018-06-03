import { expect, assert } from 'chai';
import 'mocha';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';

import { getRequest } from '../../app.spec';
import { Server } from 'http';

let request;

describe('Test regist', () => {
  before(() => {
    request = getRequest();
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

  it('should return token when regist ready', (done) => {
    request
      .post('/api/users')
      .send({
        name: 'tianyu',
        password: '123456',
      })
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });
});

describe('Test valid name', () => {
  before(() => {
    request = getRequest();
  });

  it('should return 400', (done) => {
    request
      .get('/api/users/names')
      .expect(400)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });

  it('should return 200', (done) => {
    request
      .get('/api/users/names?name=tianyu')
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        done(err);
      });
  });
});
