import * as express from 'express';
import * as multer from 'multer';
import config from '../../config/index';

import UploadController from '../controllers/upload.controller';

const routes = express.Router();

const upload = multer({ dest: config.upload.temp });

routes.post('/:thunk', upload.single('file'), UploadController.upload);

export default routes;
