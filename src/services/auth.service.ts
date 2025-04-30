// src/services/auth.service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'cambiar_esto';

export const authService = {
  registerEmpleado: async (data: {
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
      }
    });
  },

  loginEmpleado: async (email: string, password: string) => {
    // Le decimos a Prisma que incluya password en la respuesta
    const user = await prisma.empleado.findUnique({
      where: { email },
      select: {
        empleado_id: true,
        email: true,
        password: true,
        isAdmin: true
      }
    });
    if (!user) throw new Error('Usuario no encontrado');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Contraseña incorrecta');

    const token = jwt.sign(
      { sub: user.empleado_id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    // Guarda el token en la tabla AuthToken
    await prisma.authToken.create({
      data: {
        token,
        empleadoId: user.empleado_id
      }
    });
    return token;
  },

  verifyToken: (token: string) => {
    return jwt.verify(token, JWT_SECRET);
  }
};
