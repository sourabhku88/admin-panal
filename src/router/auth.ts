import { Router } from 'express';
import { login, signUp } from '../controllers/auth';

const routes = Router();

routes.post('/login', login);
routes.post('/signup', signUp);

export default routes;