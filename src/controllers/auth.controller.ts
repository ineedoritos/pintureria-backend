import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const user = await authService.registerEmpleado(req.body);
      res.status(201).json({ message: 'Empleado registrado', id: user.empleado_id });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await authService.loginEmpleado(email, password);
      res.json({ token });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }
};
