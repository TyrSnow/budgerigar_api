import * as mongoose from 'mongoose';
import { UserModel } from './User';
import AUTH_TYPE from '../constants/AuthType.enum';

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
    name: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
  },
  head: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<UserModel.IUser>('User', model);
export default User;
