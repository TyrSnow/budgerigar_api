import { Router } from 'express';
import { validate } from 'express-jsonschema';

import { requestUser } from '../tools/auth';
import ProjectCtrl from '../controllers/project.controller';
import ProjectSchemas from '../schemas/project.schemas';

let routes = Router();

routes.post('/', requestUser, validate(ProjectSchemas.create), ProjectCtrl.create);
routes.get('/:projId', requestUser, ProjectCtrl.get_one);
routes.delete('/:projId', requestUser, ProjectCtrl.delete_one);
routes.get('/', requestUser, validate(ProjectSchemas.queryDocs), ProjectCtrl.query);

export default routes;
