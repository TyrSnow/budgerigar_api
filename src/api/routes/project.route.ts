import { Router } from 'express'
import { validate } from 'express-jsonschema'

import { requestUser } from '../tools/auth'
import ProjectCtrl from '../controllers/project.controller'
import ProjectSchemas from '../schemas/project.schemas'

let docRoutes = Router();

docRoutes.post('/', requestUser, validate(ProjectSchemas.create), ProjectCtrl.create);
docRoutes.get('/:projId', requestUser, ProjectCtrl.get_one);
docRoutes.delete('/:projId', requestUser, ProjectCtrl.delete_one);
docRoutes.get('/', requestUser, validate(ProjectSchemas.queryDocs), ProjectCtrl.query);

export default docRoutes