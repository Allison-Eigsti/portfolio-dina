import imageSchema from "./schemas/imageSchema.js"
const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },

    thumbnail: imageSchema,

    displayOrder: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
