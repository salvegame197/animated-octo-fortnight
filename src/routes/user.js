import { Router } from 'express';
import userController from '../controllers/UserControllers';

const router = new Router();

router.get('/', userController.index);

export default router;
