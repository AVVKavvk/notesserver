const otpGenerator = require("otp-generator");
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { success, error } = require("../utils/wrapper");
const transporter = nodemailer.createTransport({
  host: process.env.Host,
  port: process.envSMTPPort,
  auth: {
    user: process.env.SMTPEmail,
    pass: process.env.SMTPPass,
  },
});
const sendEmailController = expressAsyncHandler(async (req, res) => {
  const email = req?.body?.email;
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: true,
  });
  var mailOptions = {
    from: process.env.SMTPEmail,
    to: email,
    subject: "OTP from VipinNotes! Ultimate Academic, Career, and Personal Growth Platform for IIIT Pune Students",
    text: `Your OTP is: ${otp} \n\nThanks for choosing VipinNotes\nRegards,\nVipin Kumawat`,
    
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return res.send(error(402, { err }));
    } else {
      return res.send(
        success(200, { message: "Email sent successfully!", otp: otp })
      );
    }
  });
});

module.exports = {
  sendEmailController,
};
