const {
  notesUpdate,
  getNotes,
  updatePaper,
  getPaper,
  updateLab,
  getLab,
  getAllLabForVerification,
  labVerification,
  paperVerification,
  getAllPaperForVerification,
} = require("../../controllers/sem1");
const route = require("express").Router();

route.post("/update/notes", notesUpdate);
route.post("/get/notes", getNotes);
route.post("/update/paper", updatePaper);
route.post("/get/paper", getPaper);
route.post("/update/lab", updateLab);
route.post("/get/lab", getLab);
route.post("/verification/lab", getAllLabForVerification);
route.post("/verified/lab", labVerification);

route.post("/verification/paper", getAllPaperForVerification);
route.post("/verified/paper", paperVerification);

module.exports = route;
