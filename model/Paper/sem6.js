const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    T1: {
      type: String,
    },
    studentEmail: {
      type: String,
    },
    T2: {
      type: String,
    },

    T3: {
      type: String,
    },
    sem:{
      type:String
    },
    isVerified:{
      type: Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sem6Paper", userSchema);
