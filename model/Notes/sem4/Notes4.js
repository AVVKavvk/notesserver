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
    },isVerified:{
      type: Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notes4", userSchema);
