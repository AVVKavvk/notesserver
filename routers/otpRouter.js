const {
    sendEmailController
} = require('../controllers/otpController')

const route = require("express").Router();

route.post("/signup", sendEmailController );

module.exports = route;