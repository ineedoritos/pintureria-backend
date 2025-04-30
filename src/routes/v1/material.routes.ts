// src/routes/v1/material.routes.ts
import { Router } from 'express';
import * as MaterialController from '../../controllers/material.controller';

const router = Router();

router.get('/', MaterialController.getMaterials);
router.get('/:id', MaterialController.getMaterial);
router.post('/', MaterialController.createMaterial);
router.put('/:id', MaterialController.updateMaterial);
router.delete('/:id', MaterialController.deleteMaterial);

export default router;
