// services/logService.js
import { sequelize } from "../config/db.js";
import log from "../models/log.js";
import { DataTypes } from "sequelize";

//Inicializamos el modelo
const Log = log.init(sequelize, DataTypes);

export const getAll = async () => {
    return await Log.findAll();
};

export const getById = async (id) => {
    return await Log.findByPk(id);
};

export const create = async (data) => {
    return await Log.create(data);
};

export const update = async (id, data) => {
    const item = await Log.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Log.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
