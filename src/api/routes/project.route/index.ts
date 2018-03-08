import { Router } from 'express';
import { validate } from 'express-jsonschema';

import { requestUser } from '../../tools/auth';
import ProjectCtrl from '../../controllers/project.controller';
import ProjectSchemas from '../../schemas/project.schemas';

import KeywordController from '../../controllers/keyword.controller';
import KeywordSchemas from '../../schemas/keyword.schemas';

import PackageController from '../../controllers/package.controller';
import PackageSchemas from '../../schemas/package.schemas';

let routes = Router();

/** 顶级路由 */
routes.post('/:projId/keywords', validate(KeywordSchemas.create), KeywordController.create);
routes.post('/:projId/packages', validate(PackageSchemas.create), PackageController.create);
routes.post('/', requestUser, validate(ProjectSchemas.create), ProjectCtrl.create);

routes.get('/:projId/packages', PackageController.list);
routes.get('/:projId', requestUser, ProjectCtrl.get_one);
routes.get('/', requestUser, validate(ProjectSchemas.queryDocs), ProjectCtrl.query);

routes.delete('/:projId', requestUser, ProjectCtrl.delete_one);

export default routes;
