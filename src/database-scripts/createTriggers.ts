import prisma from "../prisma";

let awa =false

export const createallBitacoraTriggers = async () => {
    let contador = 0;
    let dml = "";

    type Tabla = { table_name: string }[];

    // Obtener todas las tablas de la base de datos
    const tablas: Tabla = await prisma.$queryRaw`SHOW TABLES`;

    // Crear una lista de promesas para las operaciones
    const promises = [];

    // Limitar el contador a 3 iteraciones (para INSERT, UPDATE y DELETE)
    while (contador <= 2) {
        // Asignar el valor de la operación según el contador
        contador === 0 ? dml = "INSERT" : (contador === 1 ? dml = "UPDATE" : dml = "DELETE");

        for (let tabla of tablas) {
            const tableName = Object.values(tabla)[0];

            // Instrucción para eliminar el trigger si ya existe
            const dropTriggerSQL = `
            DROP TRIGGER IF EXISTS trigger_${tableName}_after_${dml};
            `;

            // Instrucción para crear el trigger
            const triggerSQL = `
            CREATE TRIGGER trigger_${tableName}_after_${dml}
            AFTER ${dml} ON ${tableName}
            FOR EACH ROW
            BEGIN
              INSERT INTO Bitacora (usuarioSistema, fechaHoraSistema, nombreTabla, transaccion)
              VALUES ('system', NOW(), '${tableName}', '${dml}');
            END;
            `;

            // Guardamos las promesas de la eliminación y creación del trigger
            promises.push(prisma.$executeRawUnsafe(dropTriggerSQL)
                .then(() => prisma.$executeRawUnsafe(triggerSQL))
                .then(() => {
                    console.log(`Trigger creado para la tabla: ${tableName}`);
                })
                .catch((error) => {
                    console.error(`Error al crear trigger para la tabla ${tableName}:`, error);
                })
            );
        }

        contador++;
    }

    // Esperamos a que todas las promesas se resuelvan
    await Promise.all(promises);

    console.log('Todos los triggers fueron creados.');

    


};


