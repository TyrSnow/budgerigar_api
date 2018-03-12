import { Document } from 'mongoose';

declare namespace ProjectModel {

  interface ITranslate extends Document {
    lang: string
    text: string
  }

  interface IText extends Document {
    text: string
    translates: Array<ITranslate>
  }

  interface IKeyword extends Document {
    text: string
    desc?: string
    translates: Array<ITranslate>
  }

  interface IPackage extends Document {
    name: string
    desc?: string
    texts: Array<IText>
  }

  interface IProject extends Document {
    name: string
    desc?: string
    creator: string
    admins: Array<string>   // 项目的管理员
    members: Array<string>  // 项目对应的成员
    packages: Array<IPackage> // 项目对应的语言包
    keywords: Array<IKeyword> // 项目的关键词
    create_date: Date
    update_date: Date
  }
}