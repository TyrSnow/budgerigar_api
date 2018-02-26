import { Document } from 'mongoose';

declare namespace LanguageModel {
  interface ILanguage extends Document {
    name: string
    key: string
    flag: string
  }
}