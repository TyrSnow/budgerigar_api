import * as jwt from 'express-jwt';
import config from '../config/index';
import AUTH_TYPE, { hasAuth } from '../constants/auth';
import { ERROR } from '../core/response';
import CODE from '../constants/code';

const requestUser = jwt({
  secret: config.secretKey
});

const requestAdmin = (req, res, next) => {
  requestUser(req, res, () => {
    if (req.user.auth === AUTH_TYPE.ADMIN || req.user.auth === AUTH_TYPE.ROOT) {
      next();
    } else {
      ERROR(req, res, '[AUTH ADMIN]')(CODE.LOW_AUTHORIZE);
    }
  });
};

const requestRoot = (req, res, next) => {
  requestUser(req, res, () => {
    if (req.user.auth === AUTH_TYPE.ROOT) {
      next();
    } else {
      ERROR(req, res, '[AUTH ROOT]')(CODE.LOW_AUTHORIZE);
    }
  });
};

/**
 * 修饰器，某个特定的path需要权限
 * @param auth_type AUTH_TYPE
 */
function auth(authType) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (!target[propertyKey].interceptors) {
      Object.assign(target[propertyKey], {
        interceptors: [],
      });
    }
    target[propertyKey].interceptors.push((req, res, next) => {
      requestUser(req, res, () => {
        if (req.user) {
          if (hasAuth(authType, req.user.auth)) {
            return next();
          }

          return ERROR(req, res, `[AUTH]${authType}`)(CODE.LOW_AUTHORIZE);
        } else {
          return ERROR(req, res, `[AUTH]${authType}`)(CODE.NOT_AUTHORIZE);
        }
      });
    });
  };
}

export {
  requestUser,
  requestAdmin,
  requestRoot,
  auth,
  AUTH_TYPE,
};
