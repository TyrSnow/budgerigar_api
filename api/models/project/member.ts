import * as mongoose from 'mongoose';
import PROJECT_AUTH from '../../constants/project.auth';
import { ProjectModel } from './index.d';

const Schema = mongoose.Schema;

const Member = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  auth: {
    type: Number,
    enum: PROJECT_AUTH,
    default: PROJECT_AUTH.NORMAL, 
  },
});

Member.methods.set_auth = (auth: PROJECT_AUTH) => {
  this.auth = auth;
  this.save();
}

export default Member;
