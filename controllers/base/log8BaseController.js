// controllers/base/log8BaseController.js
import * as log8Service from "../../services/log8Service.js";

export const getAll = async (req, res) => {
    try {
        const items = await log8Service.getAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener lista", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const item = await log8Service.getById(req.params.id);
        if (!item) return res.status(404).json({ message: "No encontrado" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener detalle", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const newItem = await log8Service.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error al crear", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const updatedItem = await log8Service.update(req.params.id, req.body);
        if (!updatedItem) return res.status(404).json({ message: "No encontrado para actualizar" });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const deleted = await log8Service.remove(req.params.id);
        if (!deleted) return res.status(404).json({ message: "No encontrado para eliminar" });
        res.json({ message: "Eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar", error: error.message });
    }
};
