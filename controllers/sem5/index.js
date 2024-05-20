const Notes = require("../../model/Notes/sem5/Notes5");
const Paper = require('../../model/Paper/sem5')
const Labs = require("../../model/Labs/sem5");

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
    const AllNotes = await Notes.find({ subject_name });
    return res.send(success(200, AllNotes));
  } catch (err) {
    return res.send(error(402,err.message))
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

    const AllLabs = await Labs.find({ subject });
    return res.send(success(200, AllLabs));
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
};
