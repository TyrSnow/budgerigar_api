import * as jwt from 'jsonwebtoken'

import config from '../../config'

class TokenSrv {
    static sign(
        payload: any,
        expiresIn: string = '1h'
    ): string {
        return jwt.sign(payload, config.secretKey, {
            expiresIn
        });
    }
}

export default TokenSrv