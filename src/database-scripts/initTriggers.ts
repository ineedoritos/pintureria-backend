import prisma from "../prisma";
import { createTriggers } from "./createTriggers";

export const createAllBitacoraTriggers = async () => {
  try {
    // Verificar si ya están creados
    const control = await prisma.controlEjecucion.findUnique({
      where: { nombre_script: "bitacora_triggers" },
    });

    if (control?.ejecutado) {
      console.log(" 📝 Los triggers ya están aplicados. Saltando creación...");
      return;
    }

    console.log("🔄 Eliminando triggers antiguos...");
    await prisma.$queryRaw`CALL drop_all_bitacora_triggers();`;

    console.log("🛠️ Creando nuevos triggers...");
    await createTriggers();

    // Registrar la ejecución exitosa
    await prisma.controlEjecucion.upsert({
      where: { nombre_script: "bitacora_triggers" },
      update: { ejecutado: true, fecha_ejecucion: new Date() },
      create: {
        nombre_script: "bitacora_triggers",
        ejecutado: true,
      },
    });

    console.log("✅ Todos los triggers fueron actualizados exitosamente");

  } catch (e) {
    console.error("❌ Error fatal:", e);
    process.exit(1);
  }
};