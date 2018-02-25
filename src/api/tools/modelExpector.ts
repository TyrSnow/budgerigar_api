import { expect, assert } from 'chai'
import * as mongoose from 'mongoose'

export default class ModelExpector {
    constructor(
        private collection: mongoose.Model<any>
    ) {}

    exist(item) {
        return this.collection.findOne(item).then(
            (_item) => {
                assert.isNotNull(_item);
                return Promise.resolve();
            }
        ).catch(
            (err) => {
                return Promise.resolve();
            }
        )
    }
}