

import { Router } from 'express';
import { createRole, getRole } from '../controllers/role';

const routes = Router();

routes.get('/role', getRole);
routes.post('/role', createRole);

export default routes