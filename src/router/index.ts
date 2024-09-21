import { Router } from "express";
import { healthCheck } from "../controllers/health";
import role from './roles';
import auth from './auth';
import user from './user';
import { authentication } from "../middleware/authentication";

const router = Router();

// routes
router.use(auth);
router.get('/health', authentication, healthCheck);
router.use(authentication, role);
router.use(authentication, user);

export default router;