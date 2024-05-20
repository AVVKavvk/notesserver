const {
  notesUpdate,
  getNotes,
  getPaper,
  updatePaper,
  updateLab,
  getLab,
} = require("../../controllers/sem2");
const route = require("express").Router();

route.post("/update/notes", notesUpdate);
route.post("/get/notes", getNotes);
route.post("/update/paper", updatePaper);
route.post("/get/paper", getPaper);
route.post("/update/lab", updateLab);
route.post("/get/lab", getLab);
module.exports = route;
