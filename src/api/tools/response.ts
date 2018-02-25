import * as log4js from 'log4js'

import CODE from '../constants/Code.enum'

let log = log4js.getLogger('default');
function SUCCESS(req, res, prefix) {
    return (data) => {
        res.json({
            success: true,
            data: data
        })
        log.info(prefix, 'Success');
    }
}

function ERROR(req, res, prefix) {
    return (err) => {
        if (err instanceof Error) {
            // 未处理的系统错误
            res.status(500).send(CODE.ERROR);
            log.error(prefix, 'Error occur：', err);
        } else {
            let { status = 200, ...other } = err;
            res.status(status).send(other);
            log.warn(prefix, 'Response error：', err);
        }
    }
}

export { SUCCESS, ERROR }