// src/routes/v1/ordenCompra.routes.ts
import { Router } from 'express';
import { ordenCompraController } from '../../controllers/ordenCompra.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', requireAuth, ordenCompraController.getAll);
router.get('/:id', requireAuth, ordenCompraController.getById);
router.post('/', requireAuth, ordenCompraController.create);
router.put('/:id', requireAuth, ordenCompraController.update);
router.delete('/:id', requireAuth, ordenCompraController.delete);

export default router;
