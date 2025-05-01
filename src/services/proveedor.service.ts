// src/services/proveedor.service.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const proveedorService = {
  getAll: async () => {
    return await prisma.proveedor.findMany({
      include: { Direccion: true }
    });
  },

  getById: async (id: number) => {
    return await prisma.proveedor.findUnique({
      where: { proveedor_id: id },
      include: { Direccion: true }
    });
  },

  create: async (data: {
    nombre: string;
    telefono: string;
    email: string;
    productos_principales?: string;
    direccion_id?: number;
  }) => {
    return await prisma.proveedor.create({
      data
    });
  },

  update: async (id: number, data: Partial<{
    nombre: string;
    telefono: string;
    email: string;
    productos_principales?: string;
    direccion_id?: number;
  }>) => {
    return await prisma.proveedor.update({
      where: { proveedor_id: id },
      data
    });
  },

  delete: async (id: number) => {
    return await prisma.proveedor.delete({ where: { proveedor_id: id } });
  }
};
