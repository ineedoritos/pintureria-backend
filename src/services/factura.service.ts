// src/services/factura.service.ts
import prisma	 from "../prisma";



export const getAllFacturas = async () => {
  return await prisma.facturaPago.findMany({
    include: { DetallesOrden: true }, 
  });
};

export const getFacturaById = async (id: number) => {
  return await prisma.facturaPago.findUnique({
    where: { factura_id: id },
    include: { DetallesOrden: true },
  });
};

export const createFactura = async (data: any) => {
  return await prisma.facturaPago.create({ data });
};

export const updateFactura = async (id: number, data: any) => {
  return await prisma.facturaPago.update({
    where: { factura_id: id },
    data,
  });
};

export const deleteFactura = async (id: number) => {
  return await prisma.facturaPago.delete({
    where: { factura_id: id },
  });
};
