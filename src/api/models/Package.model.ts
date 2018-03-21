import * as mongoose from 'mongoose';
import { PackageModel } from './Package';

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    index: true,
  },
  desc: {
    type: String,
  },
  project_id: {
    type: Schema.Types.ObjectId,
    rel: 'Project',
    required: true,
  },
  template: {
    head: String,
    line: String,
    foot: String,
  },
  texts: [{
    type: Schema.Types.ObjectId,
    rel: 'Text',
  }],
});

schema.index({ // 保证可以快速拿到项目id用于验证用户权限
  _id: 1,
  project_id: 1,
});

const Package = mongoose.model<PackageModel.IPackage>('Package', schema);
export default Package;
