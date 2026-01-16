// controllers/logController.js
import * as Base from "./base/logBaseController.js";

// Exportamos las funciones del Base para usarlas en las rutas
export const getAll = Base.getAll;
export const getById = Base.getById;
export const create = Base.create;
export const update = Base.update;
export const remove = Base.remove;
