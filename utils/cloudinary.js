const {v2} = require('cloudinary')

v2.config({
  api_key : process.env.Cloudinary_API_Key,
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_secret: process.env.Cloudinary_API_Secret
})

module.exports = v2