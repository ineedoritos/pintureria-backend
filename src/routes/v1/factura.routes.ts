// src/routes/v1/factura.routes.ts
import { Router } from 'express';
import * as FacturaController from '../../controllers/factura.controller';

const router = Router();

router.get('/', FacturaController.getFacturas);
router.get('/:id', FacturaController.getFactura);
router.post('/', FacturaController.createFactura);
router.put('/:id', FacturaController.updateFactura);
router.delete('/:id', FacturaController.deleteFactura);

export default router;
