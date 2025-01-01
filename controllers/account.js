const cloudinary = require('../utils/cloudinary')
const{success,error} = require('../utils/wrapper')
const User = require('../model/User')

const uploadImageToCloudinary = async (req,res)=>{
  try {
    const image_url = req.body.image_url;
    const email = req.body.email

    if (!email || !image_url) {
      return res.json(error(402, "email and image are required"));
    }
  
    const olduser = await User?.findOne({ email })?.select("+password");
    if (!olduser) {
      return res.json(error(404, "user not found"));
    }
    
    const cloudinary_url = await cloudinary.uploader.upload(image_url,{
      folder: "VipinNotes Users",
      public_id: olduser.name +"_"+ olduser.email
    })
    
    olduser.image = cloudinary_url.url
    await olduser.save()    
    return res.json(success(200, {message: "Image uploaded", user_image:cloudinary_url.url}));
    
  } catch (err) {
    return res.json(error(402, err.message));
    
  }
}

const updateBasicDetails = async (req, res) => {
  try {
    const { email, sem, course, others, name } = req.body;

    if (!email) {
      return res.json(error(402, "Email is required"));
    }
    const olduser = await User?.findOne({ email }).select("+password");
    if (!olduser) {
      return res.json(error(404, "User not found"));
    }

    if (others && others.length > 0) {
      const validOthers = others.filter(item => item !== null && item !== undefined && item.trim() !== "");
      if (validOthers.length > 0) { 
        const updatedOthers = Array.isArray(olduser.others) 
          ? [...olduser.others, ...validOthers] 
          : [...validOthers];
          
        olduser.others = updatedOthers;
      }
    }
    
    

    if (sem) {
      olduser.sem = sem;
    }
    if (name) {
      olduser.name = name;
    }

    if (course) {
      olduser.course = course;
    }
    await olduser.save();

    return res.json(success(200, {message: "User details updated successfully", user:olduser}));

  } catch (err) {
    return res.json(error(402, err.message));
  }
};

module.exports = {uploadImageToCloudinary, updateBasicDetails}