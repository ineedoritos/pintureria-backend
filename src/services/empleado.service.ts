import { PrismaClient, EstadoEmpleado } from "@prisma/client";
const prisma = new PrismaClient();

export const empleadoService = {
  getAll: async () => {
    return await prisma.empleado.findMany({
      include: { Direccion: true }
    });
  },

  getById: async (id: number) => {
    return await prisma.empleado.findUnique({
      where: { empleado_id: id },
      include: { Direccion: true }
    });
  },

  create: async (data: any) => {
    return await prisma.empleado.create({
      data: {
        ...data,
        fecha_contratacion: new Date(),
        estado: data.estado || EstadoEmpleado.ACTIVO
      }
    });
  },

  update: async (id: number, data: any) => {
    return await prisma.empleado.update({
      where: { empleado_id: id },
      data
    });
  },

  delete: async (id: number) => {
    return await prisma.empleado.delete({
      where: { empleado_id: id }
    });
  }
};
