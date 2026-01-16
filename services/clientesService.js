// services/clientesService.js
import { sequelize } from "../config/db.js";
import clientes from "../models/clientes.js";
import { DataTypes } from "sequelize";

//Inicializamos el modelo
const Clientes = clientes.init(sequelize, DataTypes);

export const getAll = async () => {
    return await Clientes.findAll();
};

export const getById = async (id) => {
    return await Clientes.findByPk(id);
};

export const create = async (data) => {
    return await Clientes.create(data);
};

export const update = async (id, data) => {
    const item = await Clientes.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Clientes.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
