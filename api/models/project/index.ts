import * as mongoose from 'mongoose';
import { ProjectModel } from './index.d';
import Member from './member';
import PROJECT_AUTH from '../../constants/project.auth';
import * as methods from './project.methods';

const Schema = mongoose.Schema;

const model = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: String,
  open: {
    type: Boolean,
    default: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  members: [Member],
}, {
  timestamps: true,
});

model.index({ // 用户名下的项目名不能重复
  creator: 1,
  name: 1,
}, {
  unique: true,
});

Object.assign(model.methods, methods);

const Project = mongoose.model<ProjectModel.Project>('Project', model);
export default Project;
