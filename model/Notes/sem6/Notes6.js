const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    subject_name: {
      type: String,
    },
    studentEmail: {
      type: String,
    },
    pdfUrl: {
      type: String,
    },

    video_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notes6", userSchema);
