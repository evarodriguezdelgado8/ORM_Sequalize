// services/pedidosService.js
import { sequelize } from "../config/db.js";
import pedidos from "../models/pedidos.js";
import { DataTypes } from "sequelize";

//Inicializamos el modelo
const Pedidos = pedidos.init(sequelize, DataTypes);

export const getAll = async () => {
    return await Pedidos.findAll();
};

export const getById = async (id) => {
    return await Pedidos.findByPk(id);
};

export const create = async (data) => {
    return await Pedidos.create(data);
};

export const update = async (id, data) => {
    const item = await Pedidos.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Pedidos.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
