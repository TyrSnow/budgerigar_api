import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';

import config from '../../config/index';

import router from '../tools/router';
import { SUCCESS, LIST, ERROR } from '../tools/response';
/** 
 * 不同功能的文件会被放在不同的文件夹下
 */
class UploadCtrl {
  static router = Router();

  @router('/:thunk', 'post')
  static upload(req, res) {
    let { thunk } = req.params;
    let { _id } = req.user;
    let { file } = req;
    let { originalname } = req.file;
    let today = new Date();
    let timedFolder = `${today.getFullYear()}-${today.getMonth()}`;
    let folderPath = path.join(config.upload.static, config.upload.prefix, thunk, timedFolder); // 文件将要放进的目录
    fs.exists(folderPath, (exists) => {
      if (!exists) {
        try {
          fs.mkdirSync(folderPath);
        } catch (e) {
          return ERROR(req, res, '[UploadCtrl.upload]')(e);
        }
      }
      let newFileName = `${today.valueOf()}${originalname}`;
      let previewPath = `/${config.upload.prefix}/${thunk}/${timedFolder}/${newFileName}`;
      fs.rename(file.path, path.join(folderPath, newFileName), (err) => {
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
