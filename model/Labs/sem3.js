const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    studentEmail: {
      type: String,
    },
    link: {
      type: String,
    },
    subject: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sem3lab", userSchema);
