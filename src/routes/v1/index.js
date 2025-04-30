/*
src/
  routes/
    v1/
      user.routes.ts
      product.routes.ts
    v2/
      user.routes.ts
      product.routes.ts
    v1 es para el versionamiento basicamente, si algun dia se quiere cambiar algo o asi sexo
*/

      // algo asi xd


      import express from 'express';
import materialRoutes from './routes/v1/material.routes';
import clienteRoutes from './routes/v1/cliente.routes';
import empleadoRoutes from "./routes/empleado.routes";
import detalleOrdenRoutes from './routes/detalleOrden.routes';


const app = express();

app.use(express.json());

app.use('/api/materiales', materialRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/detalles-orden', detalleOrdenRoutes);
app.use("/api/empleados", empleadoRoutes);


app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
