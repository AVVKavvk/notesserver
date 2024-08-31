const { error } = require("../utils/wrapper");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const isAdminMiddleware = async (req, res, next) => {
  try {
    const token = req.body.token;
    const adminEmail = req.body.adminEmail;
    const password = req.body.adminPassword;

    if (!adminEmail || !password) {
      return res.send(error(402, "All filed required"));
    }

    const olduser = await User?.findOne({ email: adminEmail })?.select(
      "+password"
    );
    if (!olduser) {
      return res.send(error(402, "User Not Found"));
    }
    const verri = await bcrypt?.compare(password, olduser?.password);
    if (!verri) {
      // return res.status(401).send("Incorrect password");
      return res.send(error(403, "Incorrect password"));
    }

    if (token === process.env.isAdmin_Token && olduser.isAdmin) {
      next();
    } else {
      return res.send(error(402, "you are not an admin"));
    }
  } catch (err) {
    return res.send(error(402, "something went wrong"));
  }
};

module.exports = isAdminMiddleware;
