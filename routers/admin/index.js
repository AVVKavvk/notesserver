const {
  createAdmin,
  getUsers,
  deleteUser,
  findUsersByName,
  updateUserName,
  findUserByEmail,
} = require("../../controllers/admin");
const isAdminMiddleware = require("../../middleware/isAdmin");
const route = require("express").Router();
route.post("/", isAdminMiddleware, createAdmin);
route.delete("/user", isAdminMiddleware, deleteUser);
route.post("/users", isAdminMiddleware, getUsers);
route.post("/users/name", isAdminMiddleware, findUsersByName);
route.put("/users/name", isAdminMiddleware, updateUserName);
route.post("/users/email", findUserByEmail);
module.exports = route;
