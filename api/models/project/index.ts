import * as mongoose from 'mongoose';
import { ProjectModel } from './index.d';
import Member from './member';
import PROJECT_AUTH from '../../constants/project.auth';
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

model.methods.add_member = (user_id: string, auth: PROJECT_AUTH = PROJECT_AUTH.NORMAL) => {
  let count = this.members.filter((member) => member.user_id === user_id).length;
  if (count === 0) {
    this.members.push({
      user_id,
      auth,
    });
  
    this.save();
  }
}

model.methods.remove_member = (user_id: string) => {
  this.members = this.members.filter(member => member.user_id !== user_id);
  this.save();
}

const Project = mongoose.model<ProjectModel.Project>('Project', model);
export default Project;
