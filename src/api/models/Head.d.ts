import { Document } from 'mongoose';

declare namespace HeadModel {
  interface IHead extends Document {
    url: string
  }
}
