import * as mongoose from 'mongoose'
import { ConfigModel } from './Config';

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

const Config = mongoose.model<ConfigModel.IConfig>('Config', model);
export default Config;
