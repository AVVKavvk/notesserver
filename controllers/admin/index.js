const User = require("../../model/User");
const { success, error } = require("../../utils/wrapper");
const createAdmin = async (req, res) => {
  try {
    const email = req.body.email;
    const olduser = await User.findOne({ email });
    if (!olduser) {
      return res.send(error(402, "User Not Found"));
    } else {
      olduser.isAdmin = true;
      await olduser.save();
      return res.send(success(200, "admin created successfully"));
    }
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const getUsers = async (req, res) => {
  try {
    const number = parseInt(req.body.number, 10);
    console.log(number);

    if (isNaN(number) || number <= 0) {
      return res.status(400).send({ error: "Invalid number parameter" });
    }
    const users = await User.find().sort({ _id: -1 }).limit(number);

    return res.send(success(200, users));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
const findUsersByName = async (req, res) => {
  try {
    const name = req.body.name;

    if (!name || typeof name !== "string") {
      return res.send(error(402, "Invalid name parameter"));
    }

    const query = { name: { $regex: name, $options: "i" } };

    const users = await User.find(query).sort({ _id: -1 });

    return res.send(success(200, users));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.send(error(402, "User Not Found"));
    } else {
      return res.send(success(200, "User deleted successfully"));
    }
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

const updateUserName = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;

    const olduser = await User.findOne({ email });
    olduser.name = name;
    await olduser.save();
    return res.send(success(200, "User name updated successfully"));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
module.exports = {
  createAdmin,
  getUsers,
  deleteUser,
  findUsersByName,
  updateUserName,
};
