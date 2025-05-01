// src/routes/v1/envio.routes.ts
import { Router } from 'express';
import { envioController } from '../../controllers/envio.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', requireAuth, envioController.getAll);
router.get('/:id', requireAuth, envioController.getById);
router.post('/', requireAuth, envioController.create);
router.put('/:id', requireAuth, envioController.update);
router.delete('/:id', requireAuth, envioController.delete);

export default router;
