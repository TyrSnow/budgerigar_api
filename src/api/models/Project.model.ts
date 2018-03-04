import * as mongoose from 'mongoose'
import { ProjectModel } from './Project';

const Schema = mongoose.Schema;

let model = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      rel: 'User',
    },
    admins: [{
      type: mongoose.SchemaTypes.ObjectId,
      rel: 'User',
      index: true,
    }],
    members: [{
      type: mongoose.SchemaTypes.ObjectId,
      rel: 'User',
      index: true,
    }],
    packages: {
        type: Object,
        fields: {
            name: String,
            texts: [{
                text: String,
                key: String,
                trans: Object,
                keywords: [String],
            }],
        },
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model<ProjectModel.IProject>('Project', model);
export default Project;