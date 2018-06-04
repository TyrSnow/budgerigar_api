import * as mocha from 'mocha';
import { expect, assert } from 'chai';

import { timed } from './timed';
import { randomHex, timingCompair } from './util';

describe('Test randomHex', () => {
  it('should return an hex with expect length', () => {
    expect(randomHex(16).length).to.equal(16);
    expect(randomHex(32).length).to.equal(32);
    expect(randomHex(0).length).to.equal(0);
    expect(randomHex().length).to.equal(32);
  });
});

describe('Test timingCompair', () => {
  it('should return correct', () => {
    expect(timingCompair('123', '123')).to.equal(true, 'should equal');
    expect(timingCompair('123', '456')).to.equal(false, 'should not equal');
    expect(timingCompair('', '456')).to.equal(false, 'should not equal');
    expect(timingCompair('sdfgaerzc', '456')).to.equal(false, 'should not equal');
  });

  // it('should cost nearly time no matter what result is', () => {
  //   const trueTime = timed(10, timingCompair, [
  //     'abcdefg hijklmn opqrst uvwxyz 0123456789',
  //     '',
  //   ]);
  //   const falseTime = timed(10, timingCompair, [
  //     'abcdefg hijklmn opqrst uvwxyz 0123456789',
  //     'abcdefg hijklmn opqrst uvwxyz 0123456789',
  //   ]);
  //   const radio = trueTime / falseTime;
  //   console.log(radio);
  //   expect(radio).to.be.equal(1);
  // });
});
