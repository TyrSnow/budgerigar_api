import { Router } from 'express'
import { validate } from 'express-jsonschema'

import {requestUser} from '../tools/auth'
import UserCtrl from '../controllers/user.controller'
import UserSchemas from '../schemas/user.schemas'

let sessionRoutes = Router();

sessionRoutes.post('/', validate(UserSchemas.login), UserCtrl.login);
sessionRoutes.get('/', requestUser, UserCtrl.solveAuth);

export default sessionRoutes