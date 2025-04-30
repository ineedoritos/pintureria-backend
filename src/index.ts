// src/index.ts
import 'dotenv/config';
import express from 'express';

import authRoutes from './routes/v1/auth.routes';
import clienteRoutes from './routes/v1/cliente.routes';
import empleadoRoutes from './routes/v1/empleado.routes';
import materialRoutes from './routes/v1/material.routes';
import detalleOrden from './routes/v1/detalleOrden.routes';

import { requireAuth } from './middlewares/auth.middleware';

const app = express();
app.use(express.json());

// --- RUTAS PÚBLICAS ---
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/empleados', empleadoRoutes);

// --- RUTAS PROTEGIDAS (requieren JWT) ---
app.use('/api/materiales', requireAuth, materialRoutes);
app.use('/api/detalles-orden', requireAuth, detalleOrden);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
