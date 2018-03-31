import { Router } from 'express';
import { requestUser } from '../tools/auth';

import ProjectCtrl from '../controllers/project.controller';
import PackageCtrl from '../controllers/package.controller';
import LanguageCtrl from '../controllers/language.controller';
import TextCtrl from '../controllers/text.controller';
import UserCtrl from '../controllers/user.controller';
import SessionCtrl from '../controllers/session.controller';
import UploadCtrl from '../controllers/upload.controller';

let routes = Router();

routes.use('/users', UserCtrl.router);
routes.use('/sessions', SessionCtrl.router);

routes.use('/projects', requestUser, ProjectCtrl.router);
routes.use('/packages', requestUser, PackageCtrl.router);
routes.use('/languages', requestUser, LanguageCtrl.router);
routes.use('/texts', requestUser, TextCtrl.router);

routes.use('/uploads', requestUser, UploadCtrl.router);

routes.use((req, res) => {
  res.status(404).json({
    note: 'Can not find resources.',
  });
});

export default routes;
