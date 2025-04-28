// src/controllers/material.controller.ts
import { Request, Response } from 'express';
import * as MaterialService from '../services/material.service';

export const getMaterials = async (req: Request, res: Response) => {
  try {
    const materials = await MaterialService.getAllMaterials();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener materiales' });
  }
};

export const getMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const material = await MaterialService.getMaterialById(Number(id));
    if (!material) return res.status(404).json({ error: 'Material no encontrado' });
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener material' });
  }
};

export const createMaterial = async (req: Request, res: Response) => {
  try {
    const material = await MaterialService.createMaterial(req.body);
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear material' });
  }
};

export const updateMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const material = await MaterialService.updateMaterial(Number(id), req.body);
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar material' });
  }
};

export const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await MaterialService.deleteMaterial(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar material' });
  }
};
