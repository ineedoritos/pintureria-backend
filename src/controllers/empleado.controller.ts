import { Request, Response } from "express";
import { empleadoService } from "../services/empleado.service";

export const empleadoController = {
  getAll: async (_req: Request, res: Response) => {
    const empleados = await empleadoService.getAll();
    res.json(empleados);
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const empleado = await empleadoService.getById(Number(id));
    if (!empleado) return res.status(404).json({ message: "No encontrado" });
    res.json(empleado);
  },

  create: async (req: Request, res: Response) => {
    const data = req.body;
    const nuevoEmpleado = await empleadoService.create(data);
    res.status(201).json(nuevoEmpleado);
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const actualizado = await empleadoService.update(Number(id), data);
    res.json(actualizado);
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    await empleadoService.delete(Number(id));
    res.status(204).send();
  }
};
