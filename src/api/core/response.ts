import * as log4js from 'log4js';

import CODE from '../constants/Code.enum';

let log = log4js.getLogger('default');

/**
 * 请求列表类返回
 * @param req 
 * @param res 
 * @param prefix 
 */
function LIST(req, res, prefix) {
  return (data) => {
    res.json(Object.assign({
      success: true,
    }, data));
    log.info(prefix, 'Success');
  }
}

/**
 * 标准返回
 * @param req 
 * @param res 
 * @param prefix 
 */
function SUCCESS(req, res, prefix) {
  return (data) => {
    res.json({
      success: true,
      data,
    });
    log.info(prefix, 'Success');
  }
}

/**
 * 文本返回，需要自行设置Content-Type
 * @param req 
 * @param res 
 * @param prefix 
 */
function TEXT(req, res, prefix) {
  return (data: string) => {
    res.send(data);
    log.info(prefix, 'Success');
  }
}

/**
 * 返回出错的信息
 * @param req 
 * @param res 
 * @param prefix 
 */
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

export { SUCCESS, LIST, TEXT, ERROR };
