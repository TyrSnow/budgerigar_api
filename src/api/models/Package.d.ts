import { Document } from 'mongoose';
import { TextModel } from './Text';

declare namespace PackageModel {
  interface ITemplate {
    head: string
    line: string
    foot: string
  }
  interface IPackage extends Document {
    name: string
    desc: string
    project_id: string
    languages: Array<string>
    template: ITemplate
    texts: Array<string>
  }
}