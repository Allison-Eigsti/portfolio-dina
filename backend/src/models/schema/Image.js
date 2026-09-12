import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ""
  }
}, {
  _id: false
})

export default imageSchema