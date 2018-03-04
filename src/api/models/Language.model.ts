import * as mongoose from 'mongoose'
import { LanguageModel } from './Language';

const Schema = mongoose.Schema;

let model = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  code: {
    type: String,
  },
  desc: {
    type: String,
  },
  country: {
    type: String,
  },
  flag: {
    type: String,
  },
});

const Language = mongoose.model<LanguageModel.ILanguage>('Language', model);
export default Language;
