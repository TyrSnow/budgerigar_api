import { Document } from 'mongoose';

declare namespace TranslateModel {
  interface ITranslate {
    lang: string
    textId: string
    transText: string
  }
}