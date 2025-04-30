// controllers/detalleOrden.controller.ts

import { Request, Response } from 'express';
import detalleOrdenService from '../services/detalleOrden.service';

class DetalleOrdenController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const detalles = await detalleOrdenService.getAllDetalles();
      res.json(detalles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const detalle = await detalleOrdenService.getDetalleById(id);
      if (!detalle) {
        res.status(404).json({ message: 'Detalle no encontrado' });
        return;
      }
      res.json(detalle);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const nuevoDetalle = await detalleOrdenService.createDetalle(req.body);
      res.status(201).json(nuevoDetalle);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const detalleActualizado = await detalleOrdenService.updateDetalle(id, req.body);
      res.json(detalleActualizado);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await detalleOrdenService.deleteDetalle(id);
      res.json({ message: 'Detalle eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new DetalleOrdenController();
