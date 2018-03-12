import { Router } from 'express';

import router from '../tools/router';
import validator from '../tools/validator';
import { auth, AUTH_TYPE } from '../tools/auth';
import { SUCCESS, ERROR } from '../tools/response';

import UserSrv from '../services/user.service';
import TokenSrv from '../services/token.service';
import schemas from '../schemas/user.schemas';

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
}

export default UserCtrl;
