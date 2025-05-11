// src/services/direccion.service.ts
import prisma from "../prisma";


export const direccionService = {
  getAll: async () => {
    return await prisma.direccion.findMany();
  },

  getById: async (id: number) => {
    return await prisma.direccion.findUnique({ where: { id_direccion: id } });
  },

  create: async (data: {
    departamento: string;
    municipio: string;
    distrito?: string;
    calle: string;
    colonia?: string;
    casa?: string;
    punto_referencia?: string;
  }) => {
    return await prisma.direccion.create({ data });
  },

  update: async (id: number, data: Partial<{
    departamento: string;
    municipio: string;
    distrito?: string;
    calle: string;
    colonia?: string;
    casa?: string;
    punto_referencia?: string;
  }>) => {
    return await prisma.direccion.update({
      where: { id_direccion: id },
      data
    });
  },

  delete: async (id: number) => {
    return await prisma.direccion.delete({ where: { id_direccion: id } });
  }
};
