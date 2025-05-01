// src/services/ordenCompra.service.ts
import { PrismaClient, EstadoOrdenCompra } from '@prisma/client';
const prisma = new PrismaClient();

export const ordenCompraService = {
  getAll: async () => {
    return await prisma.ordenCompra.findMany({
      include: {
        Proveedor: true,
        DetallesOrden: true,
        Envios: true
      }
    });
  },

  getById: async (id: number) => {
    return await prisma.ordenCompra.findUnique({
      where: { orden_compra_id: id },
      include: {
        Proveedor: true,
        DetallesOrden: true,
        Envios: true
      }
    });
  },

  create: async (data: {
    proveedor_id: number;
    fecha_esperada: string;         
    estado?: EstadoOrdenCompra;     
  }) => {
    return await prisma.ordenCompra.create({
      data: {
        proveedor_id: data.proveedor_id,
        fecha_esperada: new Date(data.fecha_esperada),
        estado: data.estado ?? EstadoOrdenCompra.PENDIENTE
      }
    });
  },

  update: async (id: number, data: Partial<{
    proveedor_id: number;
    fecha_orden: string;
    fecha_esperada: string;
    estado: EstadoOrdenCompra;
  }>) => {
    const updateData: any = { ...data };
    if (data.fecha_orden) updateData.fecha_orden = new Date(data.fecha_orden);
    if (data.fecha_esperada) updateData.fecha_esperada = new Date(data.fecha_esperada);

    return await prisma.ordenCompra.update({
      where: { orden_compra_id: id },
      data: updateData
    });
  },

  delete: async (id: number) => {
    return await prisma.ordenCompra.delete({ where: { orden_compra_id: id } });
  }
};
