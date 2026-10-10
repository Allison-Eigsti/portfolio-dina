const mongoose = require("mongoose");

// Schema de imagen con el publicId y url de cloudinary
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
});

module.exports = imageSchema;
