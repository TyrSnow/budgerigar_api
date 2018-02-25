import { Router } from 'express'
import { validate } from 'express-jsonschema'

import {requestUser} from '../tools/auth'
import UserCtrl from '../controllers/user.controller'
import UserSchemas from '../schemas/user.schemas'

let userRoutes = Router();

userRoutes.post('/', validate(UserSchemas.regist), UserCtrl.regist);

userRoutes.put('/Password', requestUser, validate(UserSchemas.changePassword), UserCtrl.change_password);

export default userRoutes