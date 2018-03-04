import { Router } from 'express';
import { validate } from 'express-jsonschema';

import { requestUser } from '../tools/auth';
import PackageController from '../controllers/package.controller';
import PackageSchemas from '../schemas/package.schemas';

let routes = Router();

routes.get('/:projId/packages', requestUser, PackageController.list);
routes.post('/:projId/packages', requestUser, validate(PackageSchemas.create), PackageController.create);

export default routes;
