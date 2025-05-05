import { clienteService } from './cliente.service';  // Importamos clienteService
import { empleadoService } from './empleado.service';  // Importamos empleadoService
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Empleado, PrismaClient } from '@prisma/client';
import { Cliente } from '@prisma/client';
import { ROLES } from '../utils/constants';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export const authService = {
  login: async (email: string, password: string) => {
    try {
      let user: Cliente | Empleado | null = await clienteService.getClienteByEmail(email);
      let role = ROLES.CLIENT; // Asumimos que el rol es cliente por defecto
      console.log("user", user);
      if (!user) {
        user = await empleadoService.getByEmail(email);
        if (user) {
          role = user.isAdmin ? ROLES.ADMIN : ROLES.EMPLOYEE;
        }
      }

      // Si no se encuentra usuario, devuelve un mensaje de error
      if (!user) {
        return { success: false, message: "Usuario no encontrado" };
      }

      // Verificar contraseña
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log(password, user.password);
        console.log(match)
        return { success: false, message: "Contraseña incorrecta" };
        
      } 

      // Determinar el rol y obtener el id correspondiente
      const userId = 'cliente_id' in user ? user.cliente_id : user.empleado_id;

      const token = jwt.sign(
        { sub: userId, email: user.email, role },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      // Guardar el token en la base de datos
      await prisma.authToken.create({
        data: {
          token,
          ['cliente_id' in user ? 'clienteId' : 'empleadoId']: userId,
        },
      });
      console.log(token) 
      return { success: true, token };
       // Retornar el token junto con un mensaje de éxito
    } catch (error) {
      // Manejo de errores, sin lanzar excepciones
      console.error("Error durante el login:", error);
      return { success: false, message: "Error en el proceso de autenticación" };
    }
  },


  verifyToken: (token: string) => jwt.verify(token, JWT_SECRET),
};