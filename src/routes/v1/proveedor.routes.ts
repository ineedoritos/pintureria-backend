// src/routes/v1/proveedor.routes.ts
import { Router } from 'express';
import { proveedorController } from '../../controllers/proveedor.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', requireAuth, proveedorController.getAll);
router.get('/:id', requireAuth, proveedorController.getById);

// CRUD
router.post('/', requireAuth, proveedorController.create);
router.put('/:id', requireAuth, proveedorController.update);
router.delete('/:id', requireAuth, proveedorController.delete);

export default router;
