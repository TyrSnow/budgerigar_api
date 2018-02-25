import * as mongoose from 'mongoose'
import { DocModel } from './Doc';

const Schema = mongoose.Schema;

let model = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        rel: 'User'
    }
})

const Doc = mongoose.model<DocModel.IDoc>('Doc', model);
export default Doc;