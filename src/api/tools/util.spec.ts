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
    })

    it('should return a string with seed string before it when a seed argument passed into.', () => {
        const result = generate_sault('test');
        assert.isString(result);
        assert.match(result, /^test[\da-fA-F]{60,}$/);
    })

    it('should return normally when called it 10000 in 100ms.', () => {
        let arr = [];
        let timeStart = new Date().getMilliseconds();
        for (let i = 0; i < 10000; i++) {
            arr.push(generate_sault());
        }
        let timeEnd = new Date().getMilliseconds();
        expect(arr.length).equal(10000);
        expect(timeEnd - timeStart).lessThan(100);
    })
})