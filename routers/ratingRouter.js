const route = require("express").Router();
const { createRaitng, getRating } = require("../controllers/ratingController");

route.post("/", createRaitng);
route.get("/", getRating);

module.exports = route;
