// src/controllers/ordenCompra.controller.ts
import { Request, Response } from 'express';
import { ordenCompraService } from '../services/ordenCompra.service';

export const ordenCompraController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const list = await ordenCompraService.getAll();
      res.json(list);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const oc = await ordenCompraService.getById(id);
      if (!oc) return res.status(404).json({ error: 'OrdenCompra no encontrada' });
      res.json(oc);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const nueva = await ordenCompraService.create(req.body);
      res.status(201).json(nueva);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updated = await ordenCompraService.update(id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await ordenCompraService.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
