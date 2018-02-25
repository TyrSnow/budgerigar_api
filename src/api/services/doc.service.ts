import { DocModel } from '../models/Doc'
import Doc from '../models/Doc.model'
import CODE from '../constants/Code.enum';

class DocSrv {
    static create_one(
        userId: string,
        name: string
    ): Promise<string> {
        let doc = new Doc({
            name: name,
            creator: userId
        });
        return doc.save().then(
            _doc => Promise.resolve(_doc._id)
        );
    }

    static list_user_doc(
        userId: string,
        index: number,
        size: number
    ): Promise<DocModel.IDoc[]> {
        return Doc.find({
            creator: userId
        }).skip(size * (index - 1)).limit(size - 0).then(
            res => Promise.resolve(res)
        )
    }

    static count_user_doc(
        userId: string
    ): Promise<number> {
        return Doc.count({
            creator: userId
        }).exec();
    }

    static get_doc_info(
        userId: string,
        docId: string
    ): Promise<DocModel.IDoc> {
        return Doc.findOne({
            _id: docId
        }).then(
            (res) => {
                if (res) {
                    if (res.creator == userId) {
                        return Promise.resolve(res);
                    } else {
                        return Promise.reject(CODE.NO_AUTH_TO_ACCESS_RESOURCE);
                    }
                } else {
                    return Promise.reject(CODE.DOC_NOT_EXIST);
                }
            }
        )
    }

    static delete_doc(
        docId: string
    ): Promise<DocModel.IDoc> {
        return Doc.findOneAndRemove({
            _id: docId
        }).then(
            (doc) => {
                if (doc) {
                    return Promise.resolve(doc);
                } else {
                    return Promise.reject(CODE.DOC_NOT_EXIST);
                }
            }
        );
    }
}

export default DocSrv