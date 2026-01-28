// services/carlos46Service.js
import { sequelize } from "../config/db.js";
import carlos46 from "../models/carlos46.js";
import { DataTypes } from "sequelize";

//Inicializamos el modelo
const Carlos46 = carlos46.init(sequelize, DataTypes);

export const getAll = async () => {
    return await Carlos46.findAll();
};

export const getById = async (id) => {
    return await Carlos46.findByPk(id);
};

export const create = async (data) => {
    return await Carlos46.create(data);
};

export const update = async (id, data) => {
    const item = await Carlos46.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Carlos46.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
