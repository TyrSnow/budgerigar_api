import * as mongoose from 'mongoose'
import { ProjectModel } from './index.d';
import Translate from './translate.model';

const Schema = mongoose.Schema;

let Keyword = new Schema({
  text: {
    type: String,
    required: true,
  },
  desc: String,
  translates: [Translate],
});

// const Keyword = mongoose.model<ProjectModel.IKeyword>('Keyword', model);
export default Keyword;
