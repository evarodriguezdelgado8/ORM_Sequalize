// services/log8Service.js
import { sequelize } from "../config/db.js";
import log8 from "../models/log8.js";
import { DataTypes } from "sequelize";

//Inicializamos el modelo
const Log8 = log8.init(sequelize, DataTypes);

export const getAll = async () => {
    return await Log8.findAll();
};

export const getById = async (id) => {
    return await Log8.findByPk(id);
};

export const create = async (data) => {
    return await Log8.create(data);
};

export const update = async (id, data) => {
    const item = await Log8.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Log8.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
