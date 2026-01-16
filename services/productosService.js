// services/productosService.js
import { sequelize } from "../config/db.js";
import productos from "../models/productos.js";
import { DataTypes } from "sequelize";

//Inicializamos el modelo
const Productos = productos.init(sequelize, DataTypes);

export const getAll = async () => {
    return await Productos.findAll();
};

export const getById = async (id) => {
    return await Productos.findByPk(id);
};

export const create = async (data) => {
    return await Productos.create(data);
};

export const update = async (id, data) => {
    const item = await Productos.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Productos.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
