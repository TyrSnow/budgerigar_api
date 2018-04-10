import * as log4js from 'log4js';
import User from '../models/User.model';
import {
  generate_sault,
  hash_password,
  valid_password
} from '../tools/util';
import { UserModel } from '../models/User';
import CODE from '../constants/Code.enum';
import { Regs } from '../constants/Reg.enum';
import mask_object from '../tools/maskObject';

let log = log4js.getLogger('default');
class UserSrv {
  /**
   * 创建一个新的用户
   * @param name
   * @param password
   */
  static create(
    name: string,
    password: string,
  ): Promise<UserModel.IUserInfo> {
    log.debug('[UserService.create]Input arguments: ', arguments);
    let sault = generate_sault();
    let user = new User({
      name,
      sault,
      password: {
        name: hash_password(name, sault, password),
      },
    });

    return user.save().then(
      (_user) => {
        return Promise.resolve({
          _id: _user._id,
          name: _user.name,
          auth: _user.auth,
        })
      },
      (err) => {
        if (err.code === 11000) {
          if (err.errmsg.indexOf('name') !== -1) {
            return Promise.reject(CODE.DUMPLICATE_NAME);
          }
        }
        return Promise.reject(err);
      }
    );
  }

  /**
   * 找出满足指定条件的用户
   * @param query 
   * @param skip 
   * @param size 
   */
  static query_user(
    query: object,
    skip: number,
    size: number,
  ): Promise<Array<UserModel.IUserInfo>> {
    return User.find(query, {
      name: 1,
      create_date: 1,
      auth: 1,
      block: 1,
      block_date: 1,
      delete: 1,
      delete_date: 1,
    }).skip(skip).limit(size).exec();
  }

  static block_user(
    user_id: string,
    admin_id: string,
  ): Promise<boolean> {
    log.debug('[UserService.block_user]Input arguments: ', arguments);
    return User.findOneAndUpdate({
      _id: user_id,
    }, {
      block: true,
      block_date: new Date(),
    }).then((user) => {
      if (user) {
        log.log('[UserService.block_user]user {', user_id, '} blocked by {', admin_id, '}');
        return Promise.resolve(true);
      }
      return Promise.reject(CODE.USER_NOT_EXIST);
    });
  }

  static unblock_user(
    user_id: string,
    admin_id: string,
  ): Promise<boolean> {
    log.debug('[UserService.unblock_user]Input arguments: ', arguments);
    return User.findOneAndUpdate({
      _id: user_id,
    }, {
      $unset: {
        block: 1,
        block_date: 1,
      },
    }).then((user) => {
      if (user) {
        log.log('[UserService.unblock_user]user {', user_id, '} unblocked by {', admin_id, '}');
        return Promise.resolve(true);
      }
      return Promise.reject(CODE.USER_NOT_EXIST);
    });
  }

  /**
   * 数出指定条件下的用户数目
   * @param query 
   */
  static count_user(
    query: object,
  ): Promise<number> {
    return User.count(query).exec();
  }

  /**
   * 判断一个用户名是否已经被使用
   * @param name 
   */
  static valid_name(
    name: string
  ): Promise<any> {
    log.debug('[UserService.valid_name]Input arguments: ', arguments);
    return User.findOne({
      name
    }).then(
      (user) => {
        if (user) {
          return Promise.reject(CODE.DUMPLICATE_NAME);
        } else {
          return Promise.resolve();
        }
      }
    )
  }

  /**
   * 获得指定的用户
   * @param user 'name|phone|email'
   */
  static find_user(
    user: string
  ): Promise<UserModel.IUser> {
    log.debug('[UserService.find_user]Input arguments: ', arguments);
    // 判断user的格式
    let query: any = {
      name: user
    };
    if (user.match(Regs.phone)) {
      query = {
        phone: user
      }
    } else if (user.match(Regs.email)) {
      query = {
        email: user
      }
    }
    return User.findOne(query).then(
      (user) => {
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.reject(CODE.USER_NOT_EXIST)
        }
      }
    )
  }

  /**
   * 获得指定id的用户
   * @param id 
   */
  static find_user_by_id(
    id: string
  ): Promise<UserModel.IUser> {
    log.debug('[UserService.find_user_by_id]Input arguments: ', arguments);
    return User.findOne({
      _id: id
    }).then(
      (user) => {
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.reject(CODE.USER_NOT_EXIST)
        }
      }
    )
  }

  /**
   * 核实用户的密码
   * @param user 
   * @param name 
   * @param pwd 
   */
  static valid_password(
    user: UserModel.IUser,
    name: string,
    pwd: string
  ): Promise<UserModel.IUser> {
    log.debug('[UserService.valid_password]Input arguments: ', arguments);
    return new Promise((resolve, reject) => {
      if (valid_password(name, user.sault, pwd, user.password, user.name)) {
        resolve(user);
      } else {
        reject(CODE.PASSWORD_NOT_MATCH);
      }
    })
  }

  static change_password(
    user: UserModel.IUser,
    newPwd: string
  ): Promise<any> {
    log.debug('[UserService.change_password]Input arguments: ', arguments);
    let { name, phone, email, sault } = user;
    let password: UserModel.IUserPassword = {
      name: hash_password(name, sault, newPwd),
    };
    if (phone) {
      password.phone = hash_password(phone, sault, password.name);
    }
    if (phone) {
      password.email = hash_password(email, sault, password.name);
    }
    return User.findOneAndUpdate({
      _id: user._id
    }, {
      password,
    }).then(
      (_user) => {
        if (_user) {
          return Promise.resolve();
        } else {
          return Promise.reject(CODE.USER_NOT_EXIST);
        }
      }
    );
  }

  static update_user_profile(
    user_id: string,
    user: UserModel.IUser,
  ): Promise<any> {
    log.debug('[UserService.update_user_profile]Input arguments: ', arguments);
    return User.findOneAndUpdate({
      _id: user_id,
    }, mask_object(user, ['head'])).then(
      (effected) => {
        if (effected) {
          return Promise.resolve(true);
        }
        return Promise.reject(CODE.USER_NOT_EXIST);
      },
      (err) => {
        if (err.code === 11000) {
          if (err.errmsg.indexOf('name') !== -1) {
            return Promise.reject(CODE.DUMPLICATE_NAME);
          }
        }
        return Promise.reject(err);
      }
    );
  }
}

export default UserSrv