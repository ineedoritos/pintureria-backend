import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllMaterials = async () => {
  return await prisma.material.findMany();
};

export const getMaterialById = async (id: number) => {
  return await prisma.material.findUnique({ where: { id } });
};

export const createMaterial = async (data: any) => {
  return await prisma.material.create({ data });
};

export const updateMaterial = async (id: number, data: any) => {
  return await prisma.material.update({
    where: { id },
    data,
  });
};

export const deleteMaterial = async (id: number) => {
  return await prisma.material.delete({ where: { id } });
};
