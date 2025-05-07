// src/services/material.service.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const materialService = {
  getAll: () => prisma.material.findMany(),

  getById: (id: number) =>
    prisma.material.findUnique({ where: { material_id: id } }),

  create: (data: {
    nombre: string;
    descripcion: string;
    unidad_medida: string;
    stock_actual: number;
    stock_minimo: number;
    categoria: string; // Cambiado de CategoriaItem a string o el tipo correcto
    tipo: string; // Campo requerido añadido
    imageUrl?: string;
  }) => prisma.material.create({ data }),

  update: (id: number, data: Partial<{
    nombre: string;
    descripcion: string;
    unidad_medida: string;
    stock_actual: number;
    stock_minimo: number;
    categoria: string; // Cambiado de CategoriaItem a string o el tipo correcto
    tipo?: string; // Campo opcional en actualización
    imageUrl?: string;
  }>) =>
    prisma.material.update({
      where: { material_id: id },
      data,
    }),

  delete: (id: number) =>
    prisma.material.delete({ where: { material_id: id } }),
};