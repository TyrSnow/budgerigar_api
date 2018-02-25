import * as mongoose from 'mongoose'
import { UserModel } from './User';

const Schema = mongoose.Schema;

let model = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    sault: {
        type: String,
        required: true
    },
    password: {
        email: String,
        name: String,
        phone: String
    },
    nickname: String,
    head: String,
    create_date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model<UserModel.IUser>('User', model);
export default User;