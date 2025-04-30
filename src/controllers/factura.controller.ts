// src/controllers/factura.controller.ts
import { Request, Response } from 'express';
import * as FacturaService from '../services/factura.service';

export const getFacturas = async (req: Request, res: Response) => {
  try {
    const facturas = await FacturaService.getAllFacturas();
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
};

export const getFactura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const factura = await FacturaService.getFacturaById(Number(id));
    if (!factura) return res.status(404).json({ error: 'Factura no encontrada' });
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener factura' });
  }
};

export const createFactura = async (req: Request, res: Response) => {
  try {
    const factura = await FacturaService.createFactura(req.body);
    res.status(201).json(factura);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear factura' });
  }
};

export const updateFactura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const factura = await FacturaService.updateFactura(Number(id), req.body);
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar factura' });
  }
};

export const deleteFactura = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await FacturaService.deleteFactura(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar factura' });
  }
};
