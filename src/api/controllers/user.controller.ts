import UserSrv from '../services/user.service'
import TokenSrv from '../services/token.service'

import { SUCCESS, ERROR } from '../tools/response'

class UserCtrl {
    /**
     * 用户注册
     */
    static regist(req, res) {
        let { name, password } = req.body;
        UserSrv.create(name, password).then(
            _user => {
                return Promise.resolve(TokenSrv.sign({
                    _id: _user._id,
                    name: _user.name,
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
    static valid_name(req, res) {
        let { name } = req.query;
        UserSrv.valid_name(name).then(
            SUCCESS(req, res, '[UserCtrl.valid_name]')
        ).catch(
            ERROR(req, res, '[UserCtrl.valid_name]')
        );
    }

    /**
     * 用户登陆
     */
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
    static solveAuth(req, res) {
        let { user } = req;
        let { iat, exp, ...other } = user;
        let newToken = TokenSrv.sign(
            other,
            other.remember ? '30d' : '1d'
        );
        return Promise.resolve(newToken).then(
            SUCCESS(req, res, '[UserCtrl.solveAuth]')
        );
    }

    /**
     * 更改密码
     */
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

export default UserCtrl