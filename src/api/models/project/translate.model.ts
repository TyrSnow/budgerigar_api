import * as mongoose from 'mongoose'
import { ProjectModel } from './index.d';

const Schema = mongoose.Schema;

let Translate = new Schema({
  lang: {
    type: String,
    required: true,
  },
  text: String
})

// const Translate = mongoose.model<ProjectModel.ITranslate>('Translate', model);
export default Translate;
