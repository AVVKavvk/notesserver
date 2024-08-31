const route = require("express").Router();
const { getpapers, updatepapers } = require("../../controllers/admin/sem8");

const isAdminMiddleware = require("../../middleware/isAdmin");

route.post("/papers", isAdminMiddleware, getpapers);
route.put("/papers", isAdminMiddleware, updatepapers);

module.exports = route;
