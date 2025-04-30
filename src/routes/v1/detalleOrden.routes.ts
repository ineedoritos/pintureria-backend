// routes/detalleOrden.routes.ts

import { Router } from 'express';
import detalleOrdenController from '../../controllers/detalleOrden.controller';

const router = Router();

router.get('/', detalleOrdenController.getAll);
router.get('/:id', detalleOrdenController.getById);
router.post('/', detalleOrdenController.create);
router.put('/:id', detalleOrdenController.update);
router.delete('/:id', detalleOrdenController.delete);

export default router;
