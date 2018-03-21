import * as mongoose from 'mongoose';
import { TextModel } from './Text';

const Schema = mongoose.Schema;

const schema = new Schema({
  text: {
    type: String,
    index: true,
  },
  project_id: {
    type: Schema.Types.ObjectId,
    rel: 'Project',
    required: true,
  },
  key: {
    type: String,
  },
  translates: [{
    text: String,
    lang: String,
  }],
});

schema.index({
  key: 1,
  project_id: 1,
}, {
  unique: true,
});

schema.index({
  text: 1,
  project_id: 1,
}, {
  unique: true,
});

const Text = mongoose.model<TextModel.IText>('Text', schema);
export default Text;
