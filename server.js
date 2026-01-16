import express from "express";
import productoRoutes from "./routes/productosRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import { sequelize } from "./config/db.js";
import initModels from "./models/init-models.js";

import log8Routes from "./routes/log8Routes.js";

const app = express();
app.use(express.json());
const models = initModels(sequelize);

// Rutas
app.use("/api/productos", productoRoutes);
app.use("/api/log", logRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/log8", log8Routes);

// Sincronizar base de datos
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Tablas sincronizadas.");
  } catch (error) {
    console.error("❌ Error al sincronizar las tablas:", error);
  }
})();
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
