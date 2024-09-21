import { Router } from 'express';
import { getUser } from '../controllers/user';

const routes = Router();

routes.get('/user/:id', getUser);

export default routes