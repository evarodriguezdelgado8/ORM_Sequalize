import { Sequelize } from "sequelize";
import 'dotenv/config';

// Usamos las variables del archivo .env (y si no existen, usa valores por defecto)
export const sequelize = new Sequelize(
  process.env.DB_NAME || "api_rest_db",
  process.env.DB_USER || "root",        // Aquí leerá 'osboxes' de tu .env
  process.env.DB_PASS || "",            // Aquí leerá 'osboxes.org' de tu .env
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// Comprobar conexión con la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con la base de datos.");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  }
})();
