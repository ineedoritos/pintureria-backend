// services/detalleOrden.service.ts

import prisma from "../prisma";



class DetalleOrdenService {
  async getAllDetalles() {
    return prisma.detalleOrden.findMany({
      include: {
        OrdenCompra: true,
        Material: true
      }
    });
  }

  async getDetalleById(id: number) {
    return prisma.detalleOrden.findUnique({
      where: { detalle_id: id },
      include: {
        OrdenCompra: true,
        Material: true
      }
    });
  }

  async createDetalle(data: any) {
    return prisma.detalleOrden.create({
      data
    });
  }

  async updateDetalle(id: number, data: any) {
    return prisma.detalleOrden.update({
      where: { detalle_id: id },
      data
    });
  }

  async deleteDetalle(id: number) {
    return prisma.detalleOrden.delete({
      where: { detalle_id: id }
    });
  }
}

export default new DetalleOrdenService();
