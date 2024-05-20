const Notes = require("../../model/Notes/sem4/Notes4");
const Paper = require("../../model/Paper/sem4");
const Labs = require("../../model/Labs/sem4");

const { success, error } = require("../../utils/wrapper");
const notesUpdate = async (req, res) => {
  try {
    const subject_name = req.body.subject_name;
    const pdfUrl = req.body.pdfUrl;
    const video_url = req.body.video_url;
    const studentEmail = req.body.studentEmail;
    // console.log();
    if (!subject_name || !pdfUrl) {
      return res.send(error(403, "Subject name or URL require"));
    }
    const newNotes = await Notes.create({
      subject_name,
      pdfUrl,
      video_url,
      studentEmail,
    });

    await newNotes.save();
    return res.send(success(200, "Notes Updated Successfully"));
  } catch (err) {}
};

const getNotes = async (req, res) => {
  try {
    const subject_name = req.body.subject_name;
    const AllNotes = await Notes.find();
    return res.send(success(200, AllNotes));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const updatePaper = async (req, res) => {
  try {
    const studentEmail = req.body.studentEmail;
    const T1 = req.body.T1;
    const T2 = req.body.T2;
    const T3 = req.body.T3;
    const subject = req.body.subject;

    const newPaper = await Paper.create({ studentEmail, T1, T2, T3, subject });
    await newPaper.save();
    return res.send(success(200, "Paper Updated Successfully"));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
const getPaper = async (req, res) => {
  try {
    const subject = req.body.subject;

    const AllPaper = await Paper.find({ subject });
    return res.send(success(200, AllPaper));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
const updateLab = async (req, res) => {
  try {
    const studentEmail = req.body.studentEmail;
    const link = req.body.link;
    const subject = req.body.subject;

    const newLabs = await Labs.create({ studentEmail, link, subject });
    await newLabs.save();
    return res.send(success(200, "Lab Updated Successfully"));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
const getLab = async (req, res) => {
  try {
    const subject = req.body.subject;

    const AllLabs = await Labs.find();
    return res.send(success(200, AllLabs));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
const labVerification = async (req, res) => {
  try {
    const _id = req.body.id;
    const lab = await Labs.findOne({ _id });
    if (!lab) {
      return res.send(error(404, "Lab not found"));
    }
    lab.isVerified = true;
    await lab.save();
    return res.send(success(200, "Lab Verified Successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
const getAllLabForVerification = async (req, res) => {
  try {
    const AllLabs = await Labs.find({ isVerified: false });
    return res.send(success(200, AllLabs));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const paperVerification = async (req, res) => {
  try {
    const _id = req.body.id;
    const paper = await Paper.findOne({ _id });
    if (!paper) {
      return res.send(error(404, "Paper not found"));
    }
    paper.isVerified = true;
    await paper.save();
    return res.send(success(200, "Paper Verified Successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
const getAllPaperForVerification = async (req, res) => {
  try {
    const AllPaper = await Paper.find({ isVerified: false });
    return res.send(success(200, AllPaper));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
const notesVerification = async (req, res) => {
  try {
    const _id = req.body.id;
    const notes = await Notes.findOne({ _id });
    if (!notes) {
      return res.send(error(404, "Notes not found"));
    }
    notes.isVerified = true;
    await notes.save();
    return res.send(success(200, "Notes Verified Successfully"));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};
const getAllNotesForVerification = async (req, res) => {
  try {
    const AllNotes = await Notes.find({ isVerified: false });
    return res.send(success(200, AllNotes));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
module.exports = {
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
  notesVerification,
  getAllNotesForVerification
};
