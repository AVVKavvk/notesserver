const route = require("express").Router();
const {
  getNotes,
  updateNotes,
  getlabs,
  updatelabs,
  getpapers,
  updatepapers,
} = require("../../controllers/admin/sem1");

const isAdminMiddleware = require("../../middleware/isAdmin");

route.post("/notes", isAdminMiddleware, getNotes);
route.put("/notes", isAdminMiddleware, updateNotes);

route.post("/labs", isAdminMiddleware, getlabs);
route.put("/labs", isAdminMiddleware, updatelabs);

route.post("/papers", isAdminMiddleware, getpapers);
route.put("/papers", isAdminMiddleware, updatepapers);

module.exports = route;
