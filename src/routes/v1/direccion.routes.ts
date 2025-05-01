// src/routes/v1/direccion.routes.ts
import { Router } from 'express';
import { direccionController } from '../../controllers/direccion.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', requireAuth, direccionController.getAll);
router.get('/:id', requireAuth, direccionController.getById);
router.post('/', /*requireAuth,*/ direccionController.create);
router.put('/:id', /*requireAuth,*/ direccionController.update);
router.delete('/:id', /*requireAuth,*/ direccionController.delete);

export default router;
