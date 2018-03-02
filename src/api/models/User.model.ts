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
    },
    phone: {
        type: String,
    },
    sault: {
        type: String,
        required: true
    },
    password: {
        name: {
            type: String,
            required: true,
        },
        email: String,
        phone: String
    },
    head: String,
    create_date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model<UserModel.IUser>('User', model);
export default User;