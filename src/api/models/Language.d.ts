import { Document } from 'mongoose';

declare namespace LanguageModel {
  interface ILanguage extends Document {
    name: string
    desc: string
    country: string
    flag: string
  }
}
