import fs from "fs";
import path from "path";

//Definición de rutas
const modelsPath = "./models";
const servicesPath = "./services";
const controllersBasePath = "./controllers/base";
const controllersPath = "./controllers";
const routesPath = "./routes";

//Crear carpetas si no existen (Recursive: true crea subcarpetas si faltan)
fs.mkdirSync(servicesPath, { recursive: true });
fs.mkdirSync(controllersBasePath, { recursive: true });
fs.mkdirSync(controllersPath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });

// Filtramos modelos (excluyendo archivos de configuración)
const models = fs
  .readdirSync(modelsPath)
  .filter((f) => f.endsWith(".js") && f !== "init-models.js" && f !== "index.js");

console.log(`🚀 Generando arquitectura MVC para ${models.length} modelos...`);

for (const modelFile of models) {
  const modelName = path.basename(modelFile, ".js"); // ejemplo: productos
  // Nombres de clases y archivos
  const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); // Productos
  const serviceName = `${modelName}Service`;
  const baseControllerName = `${modelName}BaseController`;
  const controllerName = `${modelName}Controller`;
  
  // Para singularizar (ej: productos -> producto)
  const singular = modelName.replace(/s$/, ""); 

  // =========================================================
  // 1️⃣ CAPA SERVICIO (Acceso a Datos / Sequelize)
  // =========================================================
  // Aquí movemos la lógica de Sequelize que antes estaba en el controlador
  const serviceContent = `// services/${serviceName}.js
import { sequelize } from "../config/db.js";
import ${modelName} from "../models/${modelFile}";
import { DataTypes } from "sequelize";

//Inicializamos el modelo
const ${modelClass} = ${modelName}.init(sequelize, DataTypes);

export const getAll = async () => {
    return await ${modelClass}.findAll();
};

export const getById = async (id) => {
    return await ${modelClass}.findByPk(id);
};

export const create = async (data) => {
    return await ${modelClass}.create(data);
};

export const update = async (id, data) => {
    const item = await ${modelClass}.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await ${modelClass}.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
`;
  fs.writeFileSync(`${servicesPath}/${serviceName}.js`, serviceContent);

  // =========================================================
  // 2️⃣ CAPA CONTROLADOR BASE (Lógica HTTP Genérica)
  // =========================================================
  // Este controlador gestiona req y res, y llama al servicio
  const baseControllerContent = `// controllers/base/${baseControllerName}.js
import * as ${serviceName} from "../../services/${serviceName}.js";

export const getAll = async (req, res) => {
    try {
        const items = await ${serviceName}.getAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener lista", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const item = await ${serviceName}.getById(req.params.id);
        if (!item) return res.status(404).json({ message: "No encontrado" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener detalle", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const newItem = await ${serviceName}.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error al crear", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const updatedItem = await ${serviceName}.update(req.params.id, req.body);
        if (!updatedItem) return res.status(404).json({ message: "No encontrado para actualizar" });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const deleted = await ${serviceName}.remove(req.params.id);
        if (!deleted) return res.status(404).json({ message: "No encontrado para eliminar" });
        res.json({ message: "Eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar", error: error.message });
    }
};
`;
  fs.writeFileSync(`${controllersBasePath}/${baseControllerName}.js`, baseControllerContent);

  // =========================================================
  // 3️⃣ CAPA CONTROLADOR (El que usa la ruta)
  // =========================================================
  // Hereda del Base
  const controllerContent = `// controllers/${controllerName}.js
import * as Base from "./base/${baseControllerName}.js";

// Exportamos las funciones del Base para usarlas en las rutas
export const getAll = Base.getAll;
export const getById = Base.getById;
export const create = Base.create;
export const update = Base.update;
export const remove = Base.remove;
`;
  fs.writeFileSync(`${controllersPath}/${controllerName}.js`, controllerContent);

  // =========================================================
  // 4️⃣ CAPA RUTA
  // =========================================================
  const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import { getAll, getById, create, update, remove } from "../controllers/${controllerName}.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
`;
  fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);

  console.log(`✅ MVC generado para: ${modelName}`);
}

console.log("🎉 AutoCRUD finalizado. Arquitectura generada correctamente.");