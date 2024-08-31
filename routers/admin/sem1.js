const route = require("express").Router();
const {
  getpapers,
  updatepapers,
  deletePapers,
  getNotes,
  updateNotes,
  deleteNotes,
  getlabs,
  updatelabs,
  deleteLabs,
} = require("../../controllers/admin/sem1");

const isAdminMiddleware = require("../../middleware/isAdmin");

route.post("/notes", isAdminMiddleware, getNotes);
route.put("/notes", isAdminMiddleware, updateNotes);
route.delete("/notes", isAdminMiddleware, deleteNotes);

route.post("/labs", isAdminMiddleware, getlabs);
route.put("/labs", isAdminMiddleware, updatelabs);
route.delete("/labs", isAdminMiddleware, deleteLabs);

route.post("/papers", isAdminMiddleware, getpapers);
route.put("/papers", isAdminMiddleware, updatepapers);
route.delete("/papers", isAdminMiddleware, deletePapers);

module.exports = route;
