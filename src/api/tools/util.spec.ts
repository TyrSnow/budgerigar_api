import {
  generate_sault,
  hash_password,
  valid_password
} from './util'

import { expect, assert } from 'chai'
import 'mocha'

describe('Test generate_sault', () => {
  it('should return a hex number string, and it\'s length is bigger or equal 64. ', () => {
    const result = generate_sault();
    assert.isString(result);
    assert.match(result, /^[\da-fA-F]{64,}$/);
  });

  it('should return a string with seed string before it when a seed argument passed into.', () => {
    const result = generate_sault('test');
    assert.isString(result);
    assert.match(result, /^test[\da-fA-F]{60,}$/);
  });

  it('should return normally when called it 10000 in 100ms.', () => {
    let arr = [];
    let timeStart = new Date().getMilliseconds();
    for (let i = 0; i < 10000; i++) {
      arr.push(generate_sault());
    }
    let timeEnd = new Date().getMilliseconds();
    expect(arr.length).equal(10000);
    expect(timeEnd - timeStart).lessThan(100);
  });
});

describe('Test hash_password', () => {
  it('should return an string', () => {
    const sault = generate_sault();
    const result = hash_password('tianyu', sault, '123456');
    assert.isString(result);
  });
});

describe('Test valid_password', () => {
  const user = 'tianyu';
  const sault = generate_sault();
  const password = '123456';
  const phone = '18856123456';
  const email = 'test@qq.com';
  const user_hashed = hash_password(user, sault, password);
  const phone_hashed = hash_password(phone, sault, user_hashed);
  const email_hashed = hash_password(email, sault, user_hashed);
  const userPassword = {
    name: user_hashed,
    phone: phone_hashed,
    email: email_hashed,
  };

  it('should return true when password is valid', () => {
    expect(valid_password(user, sault, password, userPassword, user)).equal(true);
    expect(valid_password(phone, sault, password, userPassword, user)).equal(true);
    expect(valid_password(email, sault, password, userPassword, user)).equal(true);
  });

  it('should return false when password is invalid', () => {
    expect(valid_password(user, sault, '123', userPassword, user)).equal(false);
    expect(valid_password(phone, sault, '456', userPassword, user)).equal(false);
    expect(valid_password(email, sault, '123', userPassword, user)).equal(false);
  });

  it('phone may not exist', () => {
    const noPhoneUserPassword = {
      name: user_hashed,
      email: email_hashed,
    };
    expect(valid_password(user, sault, password, noPhoneUserPassword, user)).equal(true);
    expect(valid_password(user, sault, '123', noPhoneUserPassword, user)).equal(false);
    expect(valid_password(phone, sault, password, noPhoneUserPassword, user)).equal(false);
    expect(valid_password(phone, sault, '123', noPhoneUserPassword, user)).equal(false);
    expect(valid_password(email, sault, password, noPhoneUserPassword, user)).equal(true);
    expect(valid_password(email, sault, '123', noPhoneUserPassword, user)).equal(false);
  });
  
  it('email may not exist', () => {
    const noPhoneUserPassword = {
      name: user_hashed,
      phone: phone_hashed,
    };
    expect(valid_password(user, sault, password, noPhoneUserPassword, user)).equal(true);
    expect(valid_password(user, sault, '123', noPhoneUserPassword, user)).equal(false);
    expect(valid_password(phone, sault, password, noPhoneUserPassword, user)).equal(true);
    expect(valid_password(phone, sault, '123', noPhoneUserPassword, user)).equal(false);
    expect(valid_password(email, sault, password, noPhoneUserPassword, user)).equal(false);
    expect(valid_password(email, sault, '123', noPhoneUserPassword, user)).equal(false);
  });

  it('phone and email may both not exist', () => {
    const noPhoneUserPassword = {
      name: user_hashed,
    };
    expect(valid_password(user, sault, password, noPhoneUserPassword, user)).equal(true);
    expect(valid_password(user, sault, '123', noPhoneUserPassword, user)).equal(false);
    expect(valid_password(phone, sault, password, noPhoneUserPassword, user)).equal(false);
    expect(valid_password(phone, sault, '123', noPhoneUserPassword, user)).equal(false);
    expect(valid_password(email, sault, password, noPhoneUserPassword, user)).equal(false);
    expect(valid_password(email, sault, '123', noPhoneUserPassword, user)).equal(false);
  });
});