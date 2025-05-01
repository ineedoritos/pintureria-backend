// src/index.ts
import 'dotenv/config';
import express from 'express';

import authRoutes from './routes/v1/auth.routes';
import clienteRoutes from './routes/v1/cliente.routes';
import empleadoRoutes from './routes/v1/empleado.routes';
import materialRoutes from './routes/v1/material.routes';
import detalleOrden from './routes/v1/detalleOrden.routes';
import direccionRoutes from './routes/v1/direccion.routes';
import proveedorRoutes from './routes/v1/proveedor.routes';
import ordenCompraRoutes from './routes/v1/ordenCompra.routes';
import envioRoutes from './routes/v1/envio.routes';

import { requireAuth } from './middlewares/auth.middleware';

const app = express();
app.use(express.json());

// --- RUTAS PÚBLICAS ---
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/empleados', empleadoRoutes);

app.use('/api/proveedores', proveedorRoutes);
app.use('/api/ordenes-compra', ordenCompraRoutes);
app.use('/api/envios', envioRoutes);

// --- RUTAS PROTEGIDAS (requieren JWT) ---
app.use('/api/materiales', requireAuth, materialRoutes);
app.use('/api/detalles-orden', requireAuth, detalleOrden);
app.use('/api/direcciones', requireAuth, direccionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



import cors from 'cors';

const appp= express();
appp.use(cors());          
appp.use(express.json());
