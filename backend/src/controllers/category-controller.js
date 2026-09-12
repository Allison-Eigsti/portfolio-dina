const Category = require('../models/Category')
const slugify = require("slugify")
const { uploadImage } = require("../services/cloudinaryService")



async function getAllCategories(req, res) {
    try {
        const categories = await Category.find()
        return res.status(200).json(categories)

    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}



async function getCategoryById(req, res) {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).json({ message: "Category does not exist" })
        }

        return res.status(200).json(category)

    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}



async function createCategory(req, res) {
    try {
        const { 
            name,
            description,
            displayOrder
        } = req.body

        if (!name || displayOrder === undefined ) {
            return res.status(400).json({
                message: "Name, thumbnail and display order are required"
            })
        }

        if (!req.files?.thumbnail?.[0]) {
            return res.status(400).json({
                message: "A thumbnail is required"
            });
        }

        const slug = slugify(name, {
            lower: true,
            strict: true
        })

        //Upload thumbnail to Cloudinary
        const thumbnailResult = await uploadImage(
            req.files.thumbnail[0],
            `portfolio/categories/${slug}/thumbnail`
        )

        // Build thumbnail object for MongoDB
        const thumbnail = {
            url: thumbnailResult.secure_url,
            publicId: thumbnailResult.public_id,
            alt: ""
        }

        const category = new Category({
            name,
            slug,
            description,
            thumbnail,
            displayOrder
        })

        await category.save()

        return res.status(201).json(category)

    } catch(err) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(400).json({
                message: "A category with this name already exists"
            })
        }

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: err.message
            })
        }

        return res.status(500).json({ message: err.message })
    }
}



async function updateCategory(req, res) {
    try {
        const allowedFields = [
            "name",
            "description",
            "thumbnail",
            "displayOrder"
        ]

        const updates = {}

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field]
            }
        })

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true
            }
        )

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        return res.status(200).json(category)

    } catch(err) {

        if (err.code === 11000) {
            return res.status(400).json({
                message: "A category with this name already exists"
            })
        }

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: err.message
            })
        }

        return res.status(500).json({
            message: err.message
        })
    }
}

async function deleteCategory(req, res) {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id)
       
        if(!deleteCategory) {
            return res.status(404).json({ message: 'Category not found. '})
        }

         return res.status(200).json({ message: 'Category'})
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
}



module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}