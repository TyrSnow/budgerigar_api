import { Router } from 'express';

import router from '../tools/router';
import validator from '../tools/validator';
import { auth, AUTH_TYPE } from '../tools/auth';
import { SUCCESS, ERROR } from '../tools/response';

import UserSrv from '../services/user.service';
import TokenSrv from '../services/token.service';
import schemas from '../schemas/user.schemas';

class SessionCtrl {
  static router = Router();

  /**
   * 用户登陆
   */
  @router('/', 'post')
  @validator(schemas.login)
  static login(req, res) {
    let { user, password, remember } = req.body;
    UserSrv.find_user(user).then(
      _user => UserSrv.valid_password(_user, user, password)
    ).then(
      (_user) => {
        return Promise.resolve(TokenSrv.sign({
          _id: _user._id,
          name: _user.name,
          email: _user.email,
          phone: _user.phone,
          head: _user.head,
          auth: _user.auth,
          remember: remember,
        }, remember ? '30d' : '1d'))
      }
    ).then(
      SUCCESS(req, res, '[UserCtrl.login]')
    ).catch(
      ERROR(req, res, '[UserCtrl.login]')
    )
  }
  /**
   * 解析当前登陆用户
   * 自动续期
   */
  @router('/', 'get')
  @auth(AUTH_TYPE.USER)
  static solveAuth(req, res) {
    let { user } = req;
    let { iat, exp, ...other } = user;
    let newToken = TokenSrv.sign(
      other,
      other.remember ? '30d' : '1d'
    );
    Promise.resolve(newToken).then(
      SUCCESS(req, res, '[UserCtrl.solveAuth]')
    ).catch(
      ERROR(req, res, '[UserCtrl.login]')
    );
  }
}

export default SessionCtrl;
