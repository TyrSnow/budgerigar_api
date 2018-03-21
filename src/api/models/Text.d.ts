import { Document } from 'mongoose';

declare namespace TextModel {
  interface ITranslate extends Document {
    text: string
    lang: string
  }

  interface IText extends Document {
    key: string
    text: string
    project_id: string
    translates: [ITranslate]
  }
}
