// src/controllers/cliente.controller.ts
import { Request, Response } from 'express';
import { clienteService } from '../services/cliente.service';

export const getClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await clienteService.getAllClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

export const getCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await clienteService.getClienteById(Number(id));
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const cliente = await clienteService.createCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
    console.error(error); // Log the error for debugging
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await clienteService.updateCliente(Number(id), req.body);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await clienteService.deleteCliente(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
