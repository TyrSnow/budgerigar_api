import * as mongoose from 'mongoose'
import { PackageModel } from './Package';

const Schema = mongoose.Schema;

let model = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    project_id: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      rel: 'Project',
    },
    update_date: {
        type: Date,
        default: Date.now
    }
})

const Package = mongoose.model<PackageModel.IPackage>('Package', model);
export default Package;
