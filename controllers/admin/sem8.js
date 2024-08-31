const Paper = require("../../model/Paper/sem8");
const { error, success } = require("../../utils/wrapper");

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
const deletePapers = async (req, res) => {
  try {
    const id = req.body.id;
    const paper = await Paper.findByIdAndDelete({ _id: id });
    return res.send(success(200, paper));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
module.exports = {
  getpapers,
  updatepapers,
  deletePapers
};
