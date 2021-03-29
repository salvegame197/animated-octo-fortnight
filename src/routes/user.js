import { Router } from 'express';
import userController from '../controllers/UserControllers';
import checkCredentials from '../middlewares/checkCredentials';

const router = new Router();

router.post('/', userController.store);

router.get('/', checkCredentials, userController.show);
router.put('/', checkCredentials, userController.update);
router.delete('/', checkCredentials, userController.deleted);

export default router;
