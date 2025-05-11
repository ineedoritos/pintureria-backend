import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pintureria'
};

export async function createTriggers() {
  const connection = await mysql.createConnection(config);

  try {
    // Paso 1: Obtener nombres de tablas correctamente
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM information_schema.tables 
      WHERE table_schema = ? 
        AND TABLE_NAME != 'Bitacora'  -- <-- MAYÚSCULAS
    `, [config.database]);

    // Paso 2: Iterar y validar
    for (const table of tables as any[]) {
      const tableName = table.TABLE_NAME; // <-- MAYÚSCULAS

      // Validar nombre
      if (!tableName || tableName === 'undefined') {
        console.error('❌ Nombre de tabla inválido:', table);
        continue;
      }

      // Paso 3: Crear triggers
      const operations = ['INSERT', 'UPDATE', 'DELETE'];
      for (const operation of operations) {
        const triggerName = `trigger_${tableName}_after_${operation}`;
        const sql = `
          CREATE TRIGGER IF NOT EXISTS \`${triggerName}\`
          AFTER ${operation} ON \`${tableName}\`
          FOR EACH ROW
          BEGIN
            INSERT INTO Bitacora (usuarioSistema, fechaHoraSistema, nombreTabla, transaccion)
            VALUES (USER(), NOW(), '${tableName}', '${operation}');
          END;
        `;

        await connection.query(sql);
        console.log(`✅ Trigger creado: ${triggerName}`);
      }
    }

    console.log('🎉 ¡Todos los triggers se actualizaron!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}