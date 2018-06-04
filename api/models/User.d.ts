import { Document } from 'mongoose'
import AUTH_TYPE from '../constants/auth';

declare namespace UserModel {
  interface IConfig {
    defaultLanguage: Array<string>
  }

  interface IUser extends Document {
    _id: string
    name: string
    email?: string
    phone?: string
    sault: string
    password: string
    head?: string
    auth?: AUTH_TYPE
    create_date: string
    block?: boolean
    block_date?: Date
    delete?: boolean
    delete_date?: Date
    config?: IConfig
  }

  interface IUserInfo {
    _id: string
    name: string
    email?: string
    phone?: string
    head?: string
    auth?: AUTH_TYPE
    block?: boolean
    block_date?: Date
    delete?: boolean
    delete_date?: Date
  }
}
