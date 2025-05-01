// src/services/envio.service.ts
import { PrismaClient, EstadoEnvio } from '@prisma/client';
const prisma = new PrismaClient();

export const envioService = {
  getAll: async () => {
    return await prisma.envio.findMany({
      include: { 
        Direccion: true,
        OrdenCompra: true 
      }
    });
  },

  getById: async (id: number) => {
    return await prisma.envio.findUnique({
      where: { id_envio: id },
      include: { 
        Direccion: true,
        OrdenCompra: true 
      }
    });
  },

  create: async (data: {
    direccion_id: number;
    orden_compra_id?: number;
    estado?: EstadoEnvio;
  }) => {
    return await prisma.envio.create({
      data: {
        direccion_id: data.direccion_id,
        orden_compra_id: data.orden_compra_id ?? undefined,
        estado: data.estado ?? EstadoEnvio.PREPARANDO
      }
    });
  },

  update: async (id: number, data: Partial<{
    direccion_id: number;
    orden_compra_id?: number;
    estado: EstadoEnvio;
  }>) => {
    return await prisma.envio.update({
      where: { id_envio: id },
      data
    });
  },

  delete: async (id: number) => {
    return await prisma.envio.delete({ where: { id_envio: id } });
  }
};
