import { expect, assert } from 'chai'
import 'mocha'

import * as mongoose from 'mongoose'
import * as helper from '../tools/helper'

import User from './User.model'

import common from './model_common'
import ModelExpector from '../tools/modelExpector'
describe('Test User model', () => {
    common();
    let mExpect = new ModelExpector(User);
    let users = helper.getConnection().collection('users');
    it('Can be created', function (done) {
        let user = new User({
            name: 'tianyu',
            email: '1127@qq.com',
            phone: '123',
            sault: '212'
        });

        user.save().then(
            _user => mExpect.exist(user)
        ).then(() => {
            done();
        })
    });
});