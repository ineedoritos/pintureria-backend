// src/controllers/envio.controller.ts
import { Request, Response } from 'express';
import { envioService } from '../services/envio.service';

export const envioController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const list = await envioService.getAll();
      res.json(list);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const envio = await envioService.getById(id);
      if (!envio) return res.status(404).json({ error: 'Envío no encontrado' });
      res.json(envio);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const nueva = await envioService.create(req.body);
      res.status(201).json(nueva);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const updated = await envioService.update(id, req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await envioService.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
