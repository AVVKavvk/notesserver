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
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    sem:{
      type: String,
      default: ""
    },
    course : {
      type: String,
      default: ""
    },
    others: {
      type: [String],
      default: [],
    },
    image : {
      type : String,
      default: "https://res.cloudinary.com/dufi9bxnq/image/upload/v1731948868/VipinNotes%20Users/dummy.png"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserIIITP", userSchema);
