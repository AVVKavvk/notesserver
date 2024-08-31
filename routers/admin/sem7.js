const route = require("express").Router();
const { getpapers, updatepapers,deletePapers } = require("../../controllers/admin/sem7");

const isAdminMiddleware = require("../../middleware/isAdmin");

route.post("/papers", isAdminMiddleware, getpapers);
route.put("/papers", isAdminMiddleware, updatepapers);
route.delete("/papers", isAdminMiddleware, deletePapers);

module.exports = route;
