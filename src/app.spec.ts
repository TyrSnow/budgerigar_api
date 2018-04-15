/**
 * 这边统一生成一个request，不用个controller都生成了
 */
import * as supertest from 'supertest';
import app from './app';

after(() => {
  console.log('all test finished.');
});