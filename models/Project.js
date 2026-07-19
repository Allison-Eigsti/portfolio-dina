const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    slug: {
        type: String,
        unique: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    client: {
        type: String,
        required: false,
        trim: true
    },

    agency: {
        type: String,
        required: false,        
        trim: true
    },

    year: {
        type: Number,
        required: false,
        min: 1900,
        max: new Date().getFullYear() + 1
    },

    projectBriefing: {
        type: String,
        required: false,
        trim: true
    },

    software: {
        type: [String],
        default: [],
        required: false
    },

    tags: {
        type: [String],
        default: [],
        required: false
    },

    thumbnail: {
        type: {
            url: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: ''
        }
    }},

    images: {
        type: [{
            url: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                default: ''
            }
        }],
        default: []
    },

    layout: {
        type: {
            type: String,
            enum: ['grid', 'masonry', 'hero-grid'],
            default: 'grid'
        },

        template: {
            type: String,
            default: 'default'
        },

        settings: {
            columns: {
                type: Number,
                default: 3
            },
            
            gap: {
                type: Number,
                default: 3
            }
        },
    },

    displayOrder: {
        type: Number,
        required: true
    },

    published: {
        type: Boolean,
        required: true,
        default: false
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},

{
    timestamps: true
})