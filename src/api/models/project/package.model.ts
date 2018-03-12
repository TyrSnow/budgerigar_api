import * as mongoose from 'mongoose'
import { ProjectModel } from './index.d';
import Text from './text.model';

const Schema = mongoose.Schema;

let Package = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  desc: String,
  texts: [Text],
});

// const Package = mongoose.model<ProjectModel.IPackage>('Package', model);
export default Package;
