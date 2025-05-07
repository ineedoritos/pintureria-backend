// src/controllers/material.controller.ts
import { Request, Response } from 'express';
import { materialService } from '../services/material.service';

export const materialController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const materials = await materialService.getAll();
      res.json(materials);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const material = await materialService.getById(id);
      if (material) {
        res.json(material);
      } else {
        res.status(404).json({ error: 'Material not found' });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { 
        nombre, 
        descripcion, 
        unidad_medida, 
        stock_actual, 
        stock_minimo, 
        categoria,
        tipo // Añadido el campo tipo
      } = req.body;
      
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const mat = await materialService.create({
        nombre,
        descripcion,
        unidad_medida,
        stock_actual: Number(stock_actual),
        stock_minimo: Number(stock_minimo),
        categoria,
        tipo, // Añadido el campo requerido
        imageUrl,
      });

      res.status(201).json(mat);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { categoria, tipo, ...rest } = req.body;
      const updateData: any = { ...rest };
      
      if (categoria) updateData.categoria = categoria;
      if (tipo) updateData.tipo = tipo;
      if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

      const mat = await materialService.update(id, updateData);
      res.json(mat);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await materialService.delete(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },
};