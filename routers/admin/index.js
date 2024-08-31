const { createAdmin ,getUsers, deleteUser} = require("../../controllers/admin");
const isAdminMiddleware = require("../../middleware/isAdmin");
const route = require("express").Router();
route.post("/", isAdminMiddleware, createAdmin);
route.delete("/user", isAdminMiddleware, deleteUser);
route.get("/users", isAdminMiddleware, getUsers);
module.exports = route;
