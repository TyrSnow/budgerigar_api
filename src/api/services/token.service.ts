import * as log4js from 'log4js';
import * as jwt from 'jsonwebtoken'

import config from '../../config'

let log = log4js.getLogger('default');
class TokenSrv {
    /**
     * 签名
     * @param payload 
     * @param expiresIn 
     */
    static sign(
        payload: any,
        expiresIn: string = '1h'
    ): string {
        log.debug('[UserService.sign]Input arguments: ', arguments);
        return Object.assign({
            token: jwt.sign(
                payload,
                config.secretKey,
                {
                    expiresIn
                }
            )
        }, payload);
    }
}

export default TokenSrv