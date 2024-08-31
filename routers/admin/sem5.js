const route = require("express").Router();
const {
  getNotes,
  updateNotes,
  getlabs,
  updatelabs,
  getpapers,
  updatepapers,
} = require("../../controllers/admin/sem5");

const isAdminMiddleware = require("../../middleware/isAdmin");

route.get("/notes", isAdminMiddleware, getNotes);
route.put("/notes", isAdminMiddleware, updateNotes);

route.get("/labs", isAdminMiddleware, getlabs);
route.put("/labs", isAdminMiddleware, updatelabs);

route.get("/papers", isAdminMiddleware, getpapers);
route.put("/papers", isAdminMiddleware, updatepapers);

module.exports = route;
