import { createConnection } from 'mysql2/promise';
import mysqlConfig from './configMysql.js';

export async function designDB() {
  try {
    const dbcnx = await createConnection({
      host: mysqlConfig.host,
      user: mysqlConfig.user,
      port: mysqlConfig.port,
      password: mysqlConfig.password,
    });
    await dbcnx.query(`CREATE DATABASE IF NOT EXISTS \`${mysqlConfig.name}\``);
    console.log('Database created');
  } catch (error) {
    if (error) console.log('Error connecting or creating database: ' + error.message);
  }
}
