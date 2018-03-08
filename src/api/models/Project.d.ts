import { Document } from 'mongoose'

declare namespace ProjectModel {
  
  interface ITranslate {
    lang: string
    text: string
  }

  interface IText {
    text: string
    key: string
    trans: Array<ITranslate>
    keywords: Array<string>
  }

  interface IPackage {
    name: string
    desc?: string
    creator: string
    texts?: Array<IText>
  }

  interface IProjectListInfo {
    _id: string
    name: string
    update_date: Date
    creator: string
  }

  interface IKeyword {
    text: string,
    translations: Array<ITranslate>
  }

  interface IProject extends Document {
    name: string
    creator: string
    admins: Array<string>   // 项目的管理员
    members: Array<string>  // 项目对应的成员
    packages: Array<IPackage> // 项目对应的语言包
    keywords: Array<IKeyword> // 项目的关键词
    create_date: Date
    update_date: Date
  }
}