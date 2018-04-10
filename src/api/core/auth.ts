import * as jwt from 'express-jwt';
import config from '../../config/index';
import AUTH_TYPE, { hasAuth } from '../constants/AuthType.enum';
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

/**
 * 修饰器，某个特定的path需要权限
 * @param auth_type AUTH_TYPE
 */
function auth(auth_type) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originProperty = target[propertyKey];
    target[propertyKey] = (req, res) => {
      requestUser(req, res, () => {
        if (req.user) {
          if (hasAuth(auth_type, req.user.auth)) {
            return originProperty(req, res);
          }
          return ERROR(req, res, `[AUTH]${auth_type}`)(CODE.LOW_AUTHORIZE);
        } else {
          return ERROR(req, res, `[AUTH]${auth_type}`)(CODE.NOT_AUTHORIZE);
        }
      })
    };
  };
}

export {
  requestUser,
  requestAdmin,
  requestRoot,
  auth,
  AUTH_TYPE,
};
