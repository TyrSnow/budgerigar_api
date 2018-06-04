import { expect, assert } from 'chai';
import 'mocha';
import * as supertest from 'supertest';

import { getRequest, getToken } from '../app.spec';
import CODE from '../constants/code';

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

  it('should return project info', (done) => {
    request
      .post('/api/projects')
      .set({
        authorization: token,
      })
      .send({
        name: 'myFirstProject',
      })
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.body.data._id).to.be.string;
        done(err);
      })
  });

  it('should return code when create same project twice', (done) => {
    request
      .post('/api/projects')
      .set({
        authorization: token,
      })
      .send({
        name: 'myFirstProject',
      })
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.body.code).to.equal(CODE.PROEJCT_NAME_ALREADY_EXIST.code);
        done(err);
      })
  });
});

describe('test list auth projects', () => { // 放session里面测可能会有顺序问题
  let token;
  let request;
  before(() => {
    request = getRequest();
    token = getToken();
  });

  it('should return 401 when no auth header', (done) => {
    request
      .get('/api/session/projects')
      .expect(401)
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.body.code).to.equal(CODE.NOT_AUTHORIZE.code);
        done();
      })
  });

  it('should return a list data', (done) => {
    request
      .get('/api/session/projects')
      .set({
        authorization: token,
      })
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.body.data.page).to.exist;
        let { total, size, current } = res.body.data.page;
        expect(total).to.exist;
        expect(size).to.exist;
        expect(current).to.exist;
        let expectedLength = total - size * (current - 1);
        expect(res.body.data.list).to.exist;
        expect(res.body.data.list.length).to.exist;
        expect(res.body.data.list.length).to.equal(expectedLength);
        done();
      });
  });

  it('should return a empty list', (done) => {
    request
      .get('/api/session/projects?current=10&size=10')
      .set({
        authorization: token,
      })
      .expect(200)
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.body.data.page).to.exist;
        expect(res.body.data.list.length).to.equal(0);
        done();
      });
  });
});