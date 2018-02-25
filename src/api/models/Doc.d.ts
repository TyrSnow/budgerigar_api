import { Document } from 'mongoose'

declare namespace DocModel {
    interface IDoc extends Document {
        _id: string
        name: string
        creator: string
    }
}