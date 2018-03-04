import { Router } from 'express';
import { validate } from 'express-jsonschema';

import { requestUser, requestAdmin } from '../tools/auth';
import HeadCtrl from '../controllers/head.controller';
import HeadSchemas from '../schemas/head.schemas';

let routes = Router();

routes.post('/', requestAdmin, validate(HeadSchemas.create), HeadCtrl.create);
routes.get('/', requestUser, HeadCtrl.list);

export default routes;
