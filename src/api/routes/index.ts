import { Router } from 'express'
import userRoutes from './user.route';
import sessionRoutes from './session.route';
import projectRoutes from './project.route';

// import docRoutes from './doc.route';

let routes = Router();

routes.use('/Users', userRoutes);
routes.use('/Sessions', sessionRoutes);
// routes.use('/Documents', docRoutes);
routes.use('/Projects', projectRoutes);


routes.use((req, res) => {
    res.status(404).json({
        note: 'Can not find resources.'
    })
})
export default routes;