import * as jwt from 'express-jwt';
import config from '../../config/index';
import AUTH_TYPE from '../constants/AuthType.enum';
import { ERROR } from './response'
import CODE from '../constants/Code.enum';
let requestUser = jwt({
    secret: config.secretKey
});

let requestAdmin = (req, res, next) => {
    requestUser(req, res, () => {
        if (req.user.auth === AUTH_TYPE.ADMIN || req.user.auth === AUTH_TYPE.ROOT) {
            next();
        } else {
            ERROR(req, res, '[AUTH ADMIN]')(CODE.LOW_AUTHORIZE);
        }
    })
}

let requestRoot = (req, res, next) => {
    requestUser(req, res, () => {
        if (req.user.auth === AUTH_TYPE.ROOT) {
            next();
        } else {
            ERROR(req, res, '[AUTH ROOT]')(CODE.LOW_AUTHORIZE);
        }
    })
}

export {
    requestUser,
    requestAdmin,
    requestRoot
}