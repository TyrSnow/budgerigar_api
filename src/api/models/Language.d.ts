import { Document } from 'mongoose';
declare namespace LanguageModel {
  interface ILanguage extends Document {
    name: string
    desc?: string
    creator: string
    code: string
    flag?: string
    update_date: Date
    create_date: Date
  }
}