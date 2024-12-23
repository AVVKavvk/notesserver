const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { success, error } = require("../utils/wrapper");
const signupControlles = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const phNumber = req.body.number;
  const isTrue = req.body.real;

  if (!email || !password || !name || !phNumber) {
    // return res.status(404).send("all fileds required");
    return res.send(error(403, "all fileds required"));
  }

  const olduser = await User.findOne({ email });
  if (olduser) {
    // return res.status(200).send("Already Exists");

    return res.send(error(402, "Already Exists"));
  }

  if (isTrue) {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      name,
      password: hashPassword,
      phNumber,
    });
  }
  //   res.status(200).send("user Created Succwssfully");
  // console.log(name);

  res.send(success(201, "Enter Email for OTP"));
};
const loginController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  if (!email || !password) {
    // return res.status(404).send("all fileds required");
    return res.send(error(402, "all fileds required"));
  }

  const olduser = await User?.findOne({ email })?.select("+password");
  if (!olduser) {
    // return res.status(404).send("user not found");
    return res.send(error(404, "user not found"));
    //   return res.send(error(404, "user not found"));
  }
  // const verri = (password===olduser?.password);
  const verri = await bcrypt?.compare(password, olduser?.password);
  if (!verri) {
    // return res.status(401).send("Incorrect password");
    return res.send(error(403, "Incorrect password"));
  }

  const token = generateAccesstoken({ _id: olduser._id });
  const Referstoken = generateRefershtoken({ _id: olduser._id });
  res.cookie("jwt", Referstoken, {
    httponly: true,
    secure: true,
  });
  return res.json(success(200, { token:token, user:olduser }));
  // res.send({token})
};

const generateAccesstoken = data => {
  try {
    const token = jwt.sign(data, process.env.accessToken, {
      expiresIn: "1y",
    });

    return token;
  } catch (e) {
    // return res.send(e.message);
    return res.send(error(500, e.message));
  }
};

const generateRefershtoken = data => {
  try {
    const token = jwt.sign(data, process.env.RefershToken, {
      expiresIn: "1y",
    });

    return token;
  } catch (e) {
    return res.send(error(500, e.message));
    // return ressend(e.message);
  }
};

const refreshController = async (req, res) => {
  const refreshToken = req.cookies?.jwt;
  // console.log(req.cookies);
  if (!refreshToken) {
    // return res.send("refresh token required");
    return res.send(error(401, "refresh token required"));
  }
  try {
    const verri = jwt.verify(refreshToken, process.env.RefershToken);
    const accestoken = generateAccesstoken({ _id: verri._id });
    res.json(success(200, { accestoken }));
  } catch (e) {
    // return res.send("invaild refresh key");

    return res.send(error(401, "invaild refresh key"));
  }
};
const countController = async (req, res) => {
  const user = await User.count();
  return res.json(success(200, user));
};
const forgetPassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const Conpassword = req.body.confirmpassword;
  const isTrue = req.body.real;
  if (!email || !password || !Conpassword) {
    // return res.status(404).send("all fileds required");
    return res.send(error(402, "all fileds required"));
  }
  if (password != Conpassword) {
    // return res.status(404).send("all fileds required");
    return res.send(error(402, "Both password must be same"));
  }

  const olduser = await User?.findOne({ email })?.select("+password");
  if (!olduser) {
    // return res.status(404).send("user not found");
    return res.send(error(404, "user not found"));
    //   return res.send(error(404, "user not found"));
  }

  if (isTrue) {
    const hashPassword = await bcrypt.hash(password, 10);
    olduser.password = hashPassword;
    await olduser.save();
    return res.send(success(200, "password updated"));
  }
  return res.send(success(201, "Enter Email for OTP"));
};

const getUserDetails = async (req,res)=>{
  try {
    const email = req.body.email

    if (!email) {
      return res.json(error(402, "email is required"));
    }
  
    const olduser = await User?.findOne({ email })?.select("+password");
    if (!olduser) {
      return res.json(error(404, "user not found"));
    }

    return res.json(success(200, {user:olduser}))
  } catch (err) {
    return res.json(error(402, err.message));
  }
}
module.exports = {
  signupControlles,
  loginController,
  refreshController,
  countController,
  forgetPassword,
  getUserDetails
};
