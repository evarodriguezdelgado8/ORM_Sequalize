// controllers/base/detalles_pedidoBaseController.js
import * as detalles_pedidoService from "../../services/detalles_pedidoService.js";

export const getAll = async (req, res) => {
    try {
        const items = await detalles_pedidoService.getAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener lista", error: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const item = await detalles_pedidoService.getById(req.params.id);
        if (!item) return res.status(404).json({ message: "No encontrado" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener detalle", error: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const newItem = await detalles_pedidoService.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error al crear", error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const updatedItem = await detalles_pedidoService.update(req.params.id, req.body);
        if (!updatedItem) return res.status(404).json({ message: "No encontrado para actualizar" });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        const deleted = await detalles_pedidoService.remove(req.params.id);
        if (!deleted) return res.status(404).json({ message: "No encontrado para eliminar" });
        res.json({ message: "Eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar", error: error.message });
    }
};
