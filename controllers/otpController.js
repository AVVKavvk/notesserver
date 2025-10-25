const otpGenerator = require("otp-generator");
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { success, error } = require("../utils/wrapper");
const transporter = nodemailer.createTransport({
  host: process.env.Host,
  port: process.env.SMTPPort || 587,
  auth: {
    user: process.env.SMTPEmail,
    pass: process.env.SMTPPass,
  },
  debug: true, // Enable debug mode
  // logger: true,
});
const sendEmailController = expressAsyncHandler(async (req, res) => {
  const email = req?.body?.email;

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: true,
  });

  const mailOptions = {
    from: process.env.SMTPEmail,
    to: email,
    subject:
      "OTP from VipinNotes! Ultimate Academic, Career, and Personal Growth Platform for IIIT Pune Students",
    text: `Your OTP is: ${otp} \n\nThanks for choosing VipinNotes\nRegards,\nVipin Kumawat`,
  };

  try {
    // Convert callback to promise using await
    const info = await transporter.sendMail(mailOptions);

    return res.send(
      success(200, { message: "Email sent successfully!", otp: otp })
    );
  } catch (err) {
    console.error("Email error:", err);
    return res.send(error(402, { message: "Failed to send email", err }));
  }
});

module.exports = {
  sendEmailController,
};
