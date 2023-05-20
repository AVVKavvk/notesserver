const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
   
    phNumber: {
      type: Number,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserIIITP", userSchema);