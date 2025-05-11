import prisma from '../prisma';
import bcrypt from 'bcrypt';

 // Puedes ajustar el número de saltos (rounds) según tus necesidades

 const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10'); 



export const clienteService = {

  getAllClientes: async () => {
    return await prisma.cliente.findMany();
  },

  getClienteById: async (cliente_id: number) => {
    return await prisma.cliente.findUnique({ where: { cliente_id } });
  },

  getClienteByEmail: async (email: string) => {
    return await prisma.cliente.findUnique({ where: { email } });
  },

  createCliente: async (data: any) => {
    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    // Reemplazamos la contraseña en el objeto 'data' por la versión hasheada
    data.password = hashedPassword;

    // Ahora guardamos el cliente con la contraseña hasheada
    return await prisma.cliente.create({ data });
  },

  updateCliente: async (cliente_id: number, data: any) => {
    return await prisma.cliente.update({
      where: { cliente_id },
      data,
    });
  },

  deleteCliente: async (cliente_id: number) => {
    return await prisma.cliente.delete({ where: { cliente_id } });
  },
};

export function getAllClientes() {
  throw new Error('Function not implemented.');
}

