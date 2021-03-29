import { Router } from 'express';
import authController from '../controllers/AuthControllers';

const router = new Router();

router.post('/', authController.store);

export default router;
