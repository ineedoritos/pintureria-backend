// src/services/cliente.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllClientes = async () => {
  return await prisma.cliente.findMany();
};

export const getClienteById = async (cliente_id: number) => {
  return await prisma.cliente.findUnique({ where: { cliente_id } });
};

export const createCliente = async (data: any) => {
  return await prisma.cliente.create({ data });
};

export const updateCliente = async (cliente_id: number, data: any) => {
  return await prisma.cliente.update({
    where: { cliente_id },
    data,
  });
};

export const deleteCliente = async (cliente_id: number) => {
  return await prisma.cliente.delete({ where: { cliente_id } });
};
