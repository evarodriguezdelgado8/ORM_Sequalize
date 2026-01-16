// services/detalles_pedidoService.js
import { sequelize } from "../config/db.js";
import detalles_pedido from "../models/detalles_pedido.js";
import { DataTypes } from "sequelize";

//Inicializamos el modelo
const Detalles_pedido = detalles_pedido.init(sequelize, DataTypes);

export const getAll = async () => {
    return await Detalles_pedido.findAll();
};

export const getById = async (id) => {
    return await Detalles_pedido.findByPk(id);
};

export const create = async (data) => {
    return await Detalles_pedido.create(data);
};

export const update = async (id, data) => {
    const item = await Detalles_pedido.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Detalles_pedido.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
