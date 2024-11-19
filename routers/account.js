const  {uploadImageToCloudinary, updateBasicDetails} = require('../controllers/account')

const route = require('express').Router()

route.post("/upload/image",uploadImageToCloudinary)
route.post("/upload/basic",updateBasicDetails)

module.exports = route