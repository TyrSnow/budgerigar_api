import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  text: String,
  translates: [{
    text: String,
    lang: String,
  }],
});

export default schema;
