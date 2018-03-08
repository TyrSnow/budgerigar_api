import * as fs from 'fs';
import * as multer from 'multer';

import config from '../../config/index';
import { SUCCESS, LIST, ERROR } from '../tools/response';
/** 
 * 不同功能的文件会被放在不同的文件夹下
 */
class UploadCtrl {
  static upload(req, res) {
    let { thunk } = req.params;
    let { _id } = req.user;
    let { path, originalname } = req.file;
    let today = new Date();

    let basePath = `/${thunk}/${today.getFullYear()}-${today.getMonth()}`;
    let foldPath = `${config.upload.static}${basePath}`; // 文件夹路径

    fs.exists(foldPath, (exists) => {
      if (!exists) {
        try {
          fs.mkdirSync(foldPath);
        } catch (e) {
          return ERROR(req, res, '[UploadCtrl.upload]')(e);
        }
      }
      let previewPath = `/medias/${basePath}/${today.valueOf()}${originalname}`
      fs.rename(path, `${config.upload.static}${previewPath}`, (err) => {
        if (err) {
          return ERROR(req, res, '[UploadCtrl.upload]')(err);
        }
        return SUCCESS(req, res, '[UploadCtrl.upload]')({
          path: previewPath,
        });
      });
    });
  }
}

export default UploadCtrl;
