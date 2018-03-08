import { Router } from 'express';
import { requestUser } from '../tools/auth';

import uploadRoutes from './upload.route';
import userRoutes from './user.route';
import sessionRoutes from './session.route';
import projectRoutes from './project.route/index';
import HeadRoutes from './head.route';

// import docRoutes from './doc.route';

let routes = Router();

routes.use('/Users', userRoutes);
routes.use('/Sessions', sessionRoutes);

routes.use('/projects', requestUser, projectRoutes);

routes.use('/system/heads', HeadRoutes);

routes.use('/upload', requestUser, uploadRoutes);
// routes.use('/Documents', docRoutes);

routes.use((req, res) => {
    res.status(404).json({
        note: 'Can not find resources.'
    })
})
export default routes;
