import { EstadoEmpleado } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../prisma";



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

  getByEmail: async (email: string) => {
    return await prisma.empleado.findUnique({
      where: { email },
      
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
  },

  register: async (data: {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
  }) => {
    const hash = await bcrypt.hash(data.password, 10);
    return prisma.empleado.create({
      data: {
        email: data.email,
        password: hash,
        nombre: data.nombre,
        apellido: data.apellido,
        estado: EstadoEmpleado.ACTIVO,
        fecha_contratacion: new Date()
      },
    });
  }
};
 