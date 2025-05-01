// src/controllers/proveedor.controller.ts
import { Request, Response } from 'express';
import { proveedorService } from '../services/proveedor.service';

export const proveedorController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const list = await proveedorService.getAll();
      res.json(list);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const item = await proveedorService.getById(id);
      if (!item) return res.status(404).json({ error: 'Proveedor no encontrado' });
      res.json(item);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const nuevo = await proveedorService.create(req.body);
      res.status(201).json(nuevo);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updated = await proveedorService.update(id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await proveedorService.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
