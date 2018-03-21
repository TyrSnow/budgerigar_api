import { Document } from 'mongoose';

declare namespace ProjectModel {

  interface IProject extends Document {
    name: string
    desc?: string
    creator: string
    admins: Array<string>   // 项目的管理员
    members: Array<string>  // 项目对应的成员
    create_date: Date
    update_date: Date
  }
}