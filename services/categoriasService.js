// services/categoriasService.js
import { sequelize } from "../config/db.js";
import categorias from "../models/categorias.js";
import { DataTypes } from "sequelize";

//Inicializamos el modelo
const Categorias = categorias.init(sequelize, DataTypes);

export const getAll = async () => {
    return await Categorias.findAll();
};

export const getById = async (id) => {
    return await Categorias.findByPk(id);
};

export const create = async (data) => {
    return await Categorias.create(data);
};

export const update = async (id, data) => {
    const item = await Categorias.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Categorias.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
