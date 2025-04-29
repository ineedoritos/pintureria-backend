// src/routes/v1/cliente.routes.ts
import { Router } from 'express';
import * as ClienteController from '../../controllers/cliente.controller';

const router = Router();

router.get('/', ClienteController.getClientes);
router.get('/:id', ClienteController.getCliente);
router.post('/', ClienteController.createCliente);
router.put('/:id', ClienteController.updateCliente);
router.delete('/:id', ClienteController.deleteCliente);

export default router;
