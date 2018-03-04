import * as mongoose from 'mongoose'
import { HeadModel } from './Head';

const Schema = mongoose.Schema;

let model = new Schema({
  url: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
});

const Head = mongoose.model<HeadModel.IHead>('Head', model);
export default Head;
