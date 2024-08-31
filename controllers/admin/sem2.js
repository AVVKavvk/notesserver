const Labs = require("../../model/Labs/sem2");
const Notes = require("../../model/Notes/sem2/Notes2");
const Paper = require("../../model/Paper/sem2");
const { error, success } = require("../../utils/wrapper");
const getlabs = async (req, res) => {
  try {
    const labs = await Labs.find({ isVerified: false });

    return res.send(success(200, labs));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const updatelabs = async (req, res) => {
  try {
    const id = req.body.id;
    if (id == "" || id == null) {
      return res.send(error(402, "id is required"));
    }
    const labs = await Labs.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );
    return res.send(success(200, labs));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ isVerified: false });

    return res.send(success(200, notes));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const updateNotes = async (req, res) => {
  try {
    const id = req.body.id;
    const notes = await Notes.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );
    return res.send(success(200, notes));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const getpapers = async (req, res) => {
  try {
    const papers = await Paper.find({ isVerified: false });

    return res.send(success(200, papers));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const updatepapers = async (req, res) => {
  try {
    const id = req.body.id;
    if (id == "" || id == null) {
      return res.send(error(402, "id is required"));
    }
    const papers = await Paper.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );
    return res.send(success(200, papers));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
module.exports = {
  getpapers,
  updatepapers,
  getNotes,
  updateNotes,
  getlabs,
  updatelabs,
};
