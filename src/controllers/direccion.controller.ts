// src/controllers/direccion.controller.ts
import { Request, Response } from 'express';
import { direccionService } from '../services/direccion.service';

export const direccionController = {
  getAll: async (_req: Request, res: Response) => {
    const direcciones = await direccionService.getAll();
    res.json(direcciones);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const direccion = await direccionService.getById(id);
    if (!direccion) return res.status(404).json({ error: 'Dirección no encontrada' });
    res.json(direccion);
  },

  create: async (req: Request, res: Response) => {
    try {
      const nueva = await direccionService.create(req.body);
      res.status(201).json(nueva);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const actualizada = await direccionService.update(id, req.body);
      res.json(actualizada);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await direccionService.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
