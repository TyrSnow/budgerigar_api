import * as mongoose from 'mongoose';
import { LanguageModel } from './Language';

const Schema = mongoose.Schema;

let model = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    rel: 'User',
  },
  desc: String,
  flag: String,
  update_date: {
    type: Date,
    default: Date.now,
  },
  create_date: {
    type: Date,
    default: Date.now,
  }
});

const Language = mongoose.model<LanguageModel.ILanguage>('Language', model);
export default Language;
