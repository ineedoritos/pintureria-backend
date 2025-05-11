// src/index.ts
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';


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
import { createAllBitacoraTriggers } from './database-scripts/initTriggers';

 // Carga las variables del .env

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));         
app.use(express.json());
app.use('/uploads', express.static('uploads')); // para servir imágenes


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

// Manejo de excepciones no atrapadas
process.on('uncaughtException', (err) => {
  console.error('Excepción no atrapada:', err);

  app.use((req, res) => {
    res.status(500).json({ error: 'Error interno del servidor. Intenta más tarde.' });
  });

});

// Manejo de promesas no manejadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Rechazo no manejado:', reason);
  // Enviar una respuesta al frontend con error genérico
  app.use((req, res) => {
    res.status(500).json({ error: 'Error interno del servidor. Intenta más tarde.' });
  });

});

 
app.use((err:any, req: any, res:any, next:any) => {
  console.error(err); // Log del error
  res.status(500).json({ error: 'Error interno del servidor. Intenta más tarde.' });
});



  

dotenv.config();  



const startServer = async () => {
  try {
    await createAllBitacoraTriggers();  // Esperamos que se creen los triggers antes de iniciar el servidor
    console.log('Triggers creados correctamente.');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al crear triggers:', error);
  }
};

// Llamar a la función para iniciar el servidor
startServer();





