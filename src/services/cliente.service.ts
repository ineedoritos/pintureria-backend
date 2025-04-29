// src/services/cliente.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllClientes = async () => {
  return await prisma.cliente.findMany();
};

export const getClienteById = async (id: number) => {
  return await prisma.cliente.findUnique({ where: { id } });
};

export const createCliente = async (data: any) => {
  return await prisma.cliente.create({ data });
};

export const updateCliente = async (id: number, data: any) => {
  return await prisma.cliente.update({
    where: { id },
    data,
  });
};

export const deleteCliente = async (id: number) => {
  return await prisma.cliente.delete({ where: { id } });
};
