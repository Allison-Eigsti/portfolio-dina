const mongoose = require('mongoose')
const slugify = require('slugify')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    description: {
        type: String,
        required: false,
        trim: true
    },

    thumbnail: {
        type: {
            url: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                default: ""
            }
        }
    },

    displayOrder: {
        type: Number,
        required: true
    }
}, 

{
    timestamps: true
})

// Generate a human-readable slug
categorySchema.pre('validate', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true
        });
    }
    next();
});


const Category = mongoose.model('Category', categorySchema)

module.exports = Category