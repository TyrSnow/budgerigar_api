import { Router } from 'express';

import router from '../tools/router';
import validator from '../tools/validator';
import { auth, AUTH_TYPE } from '../tools/auth';
import { SUCCESS, ERROR, LIST } from '../tools/response';

import UserSrv from '../services/user.service';
import TokenSrv from '../services/token.service';
import schemas from '../schemas/user.schemas';

class Page {
  constructor(
    public size,
    public current,
    public total?,
  ) { }

  setTotal(total) {
    this.total = total;
  }
}
class UserCtrl {
  static router = Router();
  /**
   * 用户注册
   */
  @router('/', 'post')
  @validator(schemas.regist)
  static regist(req, res) {
    let { name, password } = req.body;
    UserSrv.create(name, password).then(
      _user => {
        return Promise.resolve(TokenSrv.sign({
          _id: _user._id,
          name: _user.name,
          email: _user.email,
          phone: _user.phone,
          head: _user.head,
          auth: _user.auth,
        }, '1d'))
      }
    ).then(
      SUCCESS(req, res, '[UserCtrl.regist]')
    ).catch(
      ERROR(req, res, '[UserCtrl.regist]')
    );
  }

  /**
   * 检查用户名是否存在
   */
  @router('/names')
  @validator(schemas.validName)
  static valid_name(req, res) {
    let { name } = req.query;
    UserSrv.valid_name(name).then(
      SUCCESS(req, res, '[UserCtrl.valid_name]')
    ).catch(
      ERROR(req, res, '[UserCtrl.valid_name]')
    );
  }

  @router('/', 'get')
  @auth(AUTH_TYPE.ADMIN)
  static list(req, res) {
    let { size, current } = req.query;
    let page = new Page(size, current);
    UserSrv.count_user({}).then(
      (total) => {
        page.setTotal(total);
        let skip = (current - 1) * size;
        if (skip > total) {
          return Promise.resolve({
            list: [],
            page,
          });
        }
        return UserSrv.query_user({}, skip, size - 0).then(
          (list) => {
            return Promise.resolve({
              list,
              page,
            });
          },
        );
      },
    ).then(
      LIST(req, res, '[UserCtrl.change_password]')
    ).catch(
      ERROR(req, res, '[UserCtrl.change_password]')
    );
  }

  /**
   * 更改密码
   */
  @router('/password', 'put')
  @auth(AUTH_TYPE.USER)
  @validator(schemas.changePassword)
  static change_password(req, res) {
    let { _id, name } = req.user;
    let { oldPwd, newPwd } = req.body;

    UserSrv.find_user_by_id(_id).then(
      _user => UserSrv.valid_password(_user, name, oldPwd)
    ).then(
      _user => UserSrv.change_password(_user, newPwd)
    ).then(
      SUCCESS(req, res, '[UserCtrl.change_password]')
    ).catch(
      ERROR(req, res, '[UserCtrl.change_password]')
    )

  }

  @router('/:userId/block', 'put')
  @auth(AUTH_TYPE.ADMIN)
  static block_user(req, res) {
    let { _id } = req.user;
    let { userId } = req.params;

    UserSrv.block_user(userId, _id).then(
      SUCCESS(req, res, '[UserCtrl.change_password]'),
    ).catch(
      ERROR(req, res, '[UserCtrl.change_password]'),
    );
  }

  @router('/:userId/block', 'delete')
  @auth(AUTH_TYPE.ADMIN)
  static unblock_user(req, res) {
    let { _id } = req.user;
    let { userId } = req.params;

    UserSrv.unblock_user(userId, _id).then(
      SUCCESS(req, res, '[UserCtrl.change_password]'),
    ).catch(
      ERROR(req, res, '[UserCtrl.change_password]'),
    );
  }
}

export default UserCtrl;
