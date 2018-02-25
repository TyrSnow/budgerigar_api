import { Document } from 'mongoose'

declare namespace UserModel {
    interface IUserPassword {
        name: string
        email: string
        phone: string
    }
    interface IUser extends Document {
        _id: string
        name: string
        email: string
        phone: string
        sault: string
        password: IUserPassword
        nickname: string
        head: string
        create_date: string
        block?: boolean
        block_date?: Date
        delete?: boolean
        delete_date?: Date
    }
    interface IUserInfo {
        _id: string
        name: string
        email: string
        phone: string
        nickname: string
        head: string
    }
}