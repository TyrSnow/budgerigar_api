import * as crypto from 'crypto';
import { UserModel } from '../models/User';
const SAULT_LENGTH = 64;

function randomHex() {
    return Math.random().toString(16).slice(2);
}
function generate_sault(seed:string = '') {
    let sault = seed;
    let len = 0;
    while (len < SAULT_LENGTH) {
        sault+= randomHex();
        len = sault.length;
    }
    return sault;
}

function hash_password(name:string, sault:string, pwd:string) {
    let hash = crypto.createHash('sha256');
    hash.update(name);
    hash.update(sault);
    hash.update(pwd);
    return hash.digest('hex');
}

function valid_password(user: string, sault: string, pwd: string, password: UserModel.IUserPassword) {
    let hashUser = hash_password(user, sault, pwd);
    if (hashUser === password.name) {
        return true;
    }
    // 手机和email会后期进行绑定，这个时候是不知道原始的用户密码是什么的，所以需要把用name字段hash的结果当作密码
    if (password.phone || password.email) {
        let secondHash = hash_password(user, sault, password.name);
        if (secondHash === password.phone || secondHash === password.email) {
            return true;
        }
    }
    return false;
}

export {
    generate_sault,
    hash_password,
    valid_password
}