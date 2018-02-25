import { Router } from 'express'
import { validate } from 'express-jsonschema'

import UserCtrl from '../controllers/user.controller'
import UserSchemas from '../schemas/user.schemas'

let sessionRoutes = Router();

sessionRoutes.post('/', validate(UserSchemas.login), UserCtrl.login);

export default sessionRoutes