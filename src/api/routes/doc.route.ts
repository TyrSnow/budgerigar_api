import { Router } from 'express'
import { validate } from 'express-jsonschema'

import { requestUser } from '../tools/auth'
import DocCtrl from '../controllers/doc.controller'
import DocSchemas from '../schemas/doc.schemas'

let docRoutes = Router();

docRoutes.post('/', requestUser, validate(DocSchemas.create), DocCtrl.create);
docRoutes.get('/:docId', requestUser, validate(DocSchemas.getOneDoc), DocCtrl.get_one_doc);
docRoutes.get('/', requestUser, validate(DocSchemas.queryDocs), DocCtrl.query_docs);

export default docRoutes