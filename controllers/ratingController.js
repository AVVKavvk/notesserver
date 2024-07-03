const Rating = require("../model/Rating/ratingModel");
const { error, success } = require("../utils/wrapper");

const createRaitng = async (req, res) => {
  const rating = req.body.star;
  const userInfo = req.body.userInfo;
  const review = req.body.review;
  if (!rating || !userInfo || !review) {
    return res.send(error(403, "All filled required"));
  }
  try {
    const userRating = await Rating.create({
      rating,
      userInfo,
      review,
    });
    await userRating.save();

    return res.send(success(200, "Rated Successfully"));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};
const getRating = async (req, res) => {
  try {
    const rating = await Rating.find({});
    return res.send(success(200, rating));
  } catch (err) {
    return res.send(error(402, err.message));
  }
};

module.exports = { createRaitng, getRating };
