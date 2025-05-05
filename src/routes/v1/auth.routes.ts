import { Router } from 'express';
import { authController } from '../../controllers/auth.controller';

const router = Router();

// Ruta para login de usuarios
router.post('/login', authController.login);

// Ruta para verificar el token
router.post('/verify-token', authController.verifyToken);

export default router;
