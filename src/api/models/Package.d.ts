import { Document } from 'mongoose';
import { TextModel } from './Text';
import { LanguageModel } from './Language';

declare namespace PackageModel {
  interface ITemplate {
    head: string
    line: string
    join: string
    header?: object
    foot: string
  }
  interface IPackage extends Document {
    name: string
    desc: string
    project_id: string
    languages: Array<string | LanguageModel.ILanguage>
    template: ITemplate
    texts: Array<string> | Array<TextModel.IText>
  }
}