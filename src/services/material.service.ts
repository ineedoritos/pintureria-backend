import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllMaterials = async () => {
  return await prisma.material.findMany();
};

export const getMaterialById = async (material_id: number) => {
  return await prisma.material.findUnique({ where: { material_id } });
};

export const createMaterial = async (data: any) => {
  return await prisma.material.create({ data });
};

export const updateMaterial = async (material_id: number, data: any) => {
  return await prisma.material.update({
    where: { material_id },
    data,
  });
};

export const deleteMaterial = async (material_id: number) => {
  return await prisma.material.delete({ where: { material_id } });
};
