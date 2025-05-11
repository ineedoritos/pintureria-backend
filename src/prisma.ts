// src/prisma.ts
import { PrismaClient } from '@prisma/client';

// Esto guarda la instancia en `global` durante desarrollo (hot-reload)
// para que no creemos varias al recargar.
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Si ya existe, reutilízala; si no, créala.
const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Solo en desarrollo asignamos para futuras importaciones
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

export default prisma;

