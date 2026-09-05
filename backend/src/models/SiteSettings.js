const mongoose = require('mongoose')

const siteSettingsSchema = new mongoose.Schema({
    siteTitle: {
        type: String,
        required: true
    },

    about: {
        bio: {
            type: String,
            required: true,
            trim: true
        },

        profileImage: {
            type: {
                url: {
                    type: String,
                    required: true
                },

                alt: {
                    type: String,
                    default: ''
                }
            }
        },

        software: {
            type: [String],
            default: []
        },

        languages: {
            type: [String],
            default: []
        }
    },

    contact: {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            trim: true
        },

        location: {
            type: String,
            trim: true
        }
    },

    socialLinks: {
        linkedin: {
            type: String,
            trim: true
        },

        behance: {
            type: String,
            trim: true
        }
    }

},

{
    timestamps: true
})

const SiteSettings = mongoose.model('siteSettingsSchema')

module.exports = SiteSettings
