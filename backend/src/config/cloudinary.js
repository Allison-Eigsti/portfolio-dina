require('dotenv').config()
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL
})


(async function() {
    const results = await cloudinary.uploader.upload('')
})