import * as mongoose from 'mongoose';
import { UserModel } from './User';
import { AUTH_TYPE } from '../constants/auth';

const Schema = mongoose.Schema;

let model = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  auth: {
    type: Number,
    enum: AUTH_TYPE,
    default: AUTH_TYPE.USER,
  },
  sault: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  head: String,
  config: {
    defaultLanguage: [String],
  },
  block: Boolean,
  block_date: Date,
  delete: Boolean,
  delete_date: Date,
}, {
  timestamps: true,
});

const User = mongoose.model<UserModel.IUser>('User', model);
export default User;
