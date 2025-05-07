// src/routes/v1/material.routes.ts
import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { materialController } from '../../controllers/material.controller';

const router = Router();

// RUTAS PÚBLICAS
router.get('/', materialController.getAll);
router.get('/:id', materialController.getById);

// RUTAS PROTEGIDAS (requieren JWT) y subida de imagen
router.post(
  '/',
  requireAuth,
  upload.single('image'),       // espera un campo <input name="image" type="file" />
  materialController.create     // tu método create lee req.file y req.body
);

router.put(
  '/:id',
  requireAuth,
  upload.single('image'),
  materialController.update
);

router.delete(
  '/:id',
  requireAuth,
  materialController.delete
);

export default router;
