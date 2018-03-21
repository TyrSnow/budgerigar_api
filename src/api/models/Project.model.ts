import * as mongoose from 'mongoose';
import { ProjectModel } from './Project.d';
const Schema = mongoose.Schema;

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
  create_date: Date,
  update_date: Date,
});

const Project = mongoose.model<ProjectModel.IProject>('Project', model);

export default Project;