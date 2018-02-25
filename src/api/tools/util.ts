import * as crypto from 'crypto';
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

function valid_password(user: string, sault: string, pwd: string, password: object) {
    let hashed = hash_password(user, sault, pwd);
    for (let key in password) {
        if (password[key] === hashed) {
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