import { Router } from 'express';
import recoveryController from '../controllers/RecoveryController';

const router = new Router();

router.post('/', recoveryController.store);
router.put('/', recoveryController.update);

export default router;
