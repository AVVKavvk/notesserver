const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    rating: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ratings", ratingSchema);
