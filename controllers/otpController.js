const otpGenerator = require("otp-generator");
const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { success, error } = require("../utils/wrapper");

const transporter = nodemailer.createTransport({
  host: process.env.Host,
  port: parseInt(process.env.SMTPPort) || 587,
  secure: false, // false for port 587, true for port 465
  auth: {
    user: process.env.SMTPEmail,
    pass: process.env.SMTPPass,
  },
  debug: true,
  logger: true,
});

// Test connection
transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server ready");
  }
});

const sendEmailController = expressAsyncHandler(async (req, res) => {
  const email = req?.body?.email;

  // Validate email
  if (!email) {
    return res.send(error(400, { message: "Email is required" }));
  }

  console.log("Generating OTP for:", email);

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
    console.log("Sending email to:", email);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return res.send(
      success(200, { message: "Email sent successfully!", otp: otp })
    );
  } catch (err) {
    console.error("❌ Email error:", err);
    return res.send(
      error(402, {
        message: "Failed to send email",
        error: err.message,
      })
    );
  }
});

module.exports = {
  sendEmailController,
};
