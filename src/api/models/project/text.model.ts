import * as mongoose from 'mongoose'
import { ProjectModel } from './index.d';
import Translate from './translate.model';
const Schema = mongoose.Schema;

let Text = new Schema({
  text: {
    type: String,
    required: true,
  },
  translates: [Translate],
});

// const Text = mongoose.model<ProjectModel.IText>('Text', model);
export default Text;
