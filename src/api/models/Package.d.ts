import { Document } from 'mongoose';

declare namespace PackageModel {
  interface ITranslate {
    lang: string
    transText: string
  }
  interface IText {
    text: string
    key: string
    trans: Array<ITranslate>
    keywords: Array<string>
  }
  interface IPackage extends Document {
    name: string
    desc?: string
    project_id: string
    creator: string
    texts: Array<IText>
  }
}