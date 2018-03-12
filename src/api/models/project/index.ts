import * as mongoose from 'mongoose';
import { ProjectModel } from './index.d';
const Schema = mongoose.Schema;

import Translate from './translate.model';
import Keyword from './keyword.model';
import Text from './text.model';
import Package from './package.model';

let model = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  desc: String,
  creator: {
    type: Schema.Types.ObjectId,
    rel: 'User',
  },
  admins: [{
    type: Schema.Types.ObjectId,
    rel: 'User',
  }],
  members: [{
    type: Schema.Types.ObjectId,
    rel: 'User',
  }],
  // packages: [Package],
  // keywords: [Keyword],
  create_date: Date,
  update_date: Date,
});

const Project = mongoose.model<ProjectModel.IProject>('Project', model);

export default Project;
export {
  Package,
  // Keyword,
  Text,
  Translate,
};