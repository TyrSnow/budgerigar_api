import { Document } from 'mongoose'
import AUTH_TYPE from '../constants/AuthType.enum';

declare namespace UserModel {
  interface IUserPassword {
    name: string
    email?: string
    phone?: string
  }
  interface IUser extends Document {
    _id: string
    name: string
    email?: string
    phone?: string
    sault: string
    password: IUserPassword
    head?: string
    auth?: AUTH_TYPE
    create_date: string
    block?: boolean
    block_date?: Date
    delete?: boolean
    delete_date?: Date
  }
  interface IUserInfo {
    _id: string
    name: string
    email?: string
    phone?: string
    head?: string
    auth?: AUTH_TYPE
  }
}
