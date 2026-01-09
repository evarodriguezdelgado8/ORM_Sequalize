import  Log  from "../models/log.js";

// CREATE
export const crearLog = async (req, res) => {
  try {
    const nuevoLog = await Log.create(req.body);
    res.status(201).json(nuevoLog);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear log", error });
  }
};

// READ (todos)
export const obtenerLogs = async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener logs", error });
  }
};

// READ (uno)
export const obtenerLog = async (req, res) => {
  try {
    const log = await Log.findByPk(req.params.id);
    if (!log) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(log);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener log", error });
  }
};

// UPDATE
export const actualizarLog = async (req, res) => {
  try {
    const log = await Log.findByPk(req.params.id);
    if (!log) return res.status(404).json({ mensaje: "No encontrado" });
    await log.update(req.body);
    res.json(log);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar log", error });
  }
};
// DELETE
export const eliminarLog = async (req, res) => {
  try {
    const log = await Log.findByPk(req.params.id);
    if (!log) return res.status(404).json({ mensaje: "No encontrado" });
    await log.destroy();
    res.json({ mensaje: "Log eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar log", error });
  }
};
