const {
    signupControlles,
    loginController,
    refreshController,
    countController
    
  } = require("../controllers/authControllers");
  
  const route = require("express").Router();
  
  route.post("/signup", signupControlles);
  route.post("/login", loginController);
  route.get("/refresh", refreshController);
  route.get("/count", countController);
  
  module.exports = route;