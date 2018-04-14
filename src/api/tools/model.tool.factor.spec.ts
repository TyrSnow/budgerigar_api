import maskObject from './maskObject';

import { expect, assert } from 'chai';
import 'mocha';

import User from '../models/User.model';
import { modelToolFactor } from './model.tool.factor';

let userTool = modelToolFactor(User);

describe('Test modelTool', () => {
  it('should clean model when clear is called', () => {
    // let user = new User({
    //   "name" : "tianyu",
    //   "sault" : "7ba50aa9742c1ad5184cc346e79eb440d5623796f1e46ffb7d5ff6626fadda4d",
    //   "config" : {
    //     "defaultLanguage" : []
    //   },
    //   "password" : {
    //       "name" : "5d3f9d13ad93f12b3e6a3e8b8dec9212254f6bdcaaa9dbb67514c5d37d92e1ad"
    //   },
    //   "auth" : 0,
    // });

    // user.save((err, userModel) => {
    //   console.log(err);
    //   done(err);
    // });
    // try {
    //   await User.insertMany([
    //     {
    //       "name" : "tianyu",
    //       "sault" : "7ba50aa9742c1ad5184cc346e79eb440d5623796f1e46ffb7d5ff6626fadda4d",
    //       "config" : {
    //         "defaultLanguage" : []
    //       },
    //       "password" : {
    //           "name" : "5d3f9d13ad93f12b3e6a3e8b8dec9212254f6bdcaaa9dbb67514c5d37d92e1ad"
    //       },
    //       "auth" : 0,
    //     }
    //   ]).catch(err => console.log);
    //   console.log('It should run');
    //   expect(await User.count({})).is.above(0);
    //   await userTool.clear();
    //   expect(await User.count({})).equal(0);
    // } catch (e) {
    //   console.log(e);
    // }
  });
});