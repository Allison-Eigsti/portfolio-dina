const Category = require('../models/Category')
const slugify = require("slugify")
const { uploadImage, deleteImage } = require("../services/cloudinaryService")



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
            `portfolio/categories/${slug}`
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
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        if (req.body.name !== undefined) {
            category.name = req.body.name;
        }

        if (req.body.description !== undefined) {
            category.description = req.body.description;
        }

        if (req.files?.thumbnail?.[0]) {

            const newImageResult = await uploadImage(
                req.files.thumbnail[0],
                `portfolio/categories/${category.slug}`
            );

            const newCoverImage = {
                url: newImageResult.secure_url,
                publicId: newImageResult.public_id,
                alt: ""
            };

            // Delete old image from Cloudinary
            if (category.thumbnail?.publicId) {
                await deleteImage(category.thumbnail.publicId);
            }

            category.thumbnail = newCoverImage;
        }
        
        await category.save()

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



async function reorderCategory(req, res) {
    try {
        const { newOrder } = req.body

        if (newOrder === undefined) {
            return res.status(400).json({
                message: "New order is required"
            })
        }

        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }

        const categories = await Category.find()
            .sort({ displayOrder: 1 })

        const newIndex = Number(newOrder) - 1

        if (
            newIndex < 0 ||
            newIndex >= categories.length
        ) {
            return res.status(400).json({
                message: "Invalid display order"
            })
        }

        const currentIndex = categories.findIndex(
            item => item._id.toString() === category._id.toString()
        )

        const [movedCategory] = categories.splice(currentIndex, 1);

        categories.splice(newIndex, 0, movedCategory);

        categories.forEach((category, index) => {
            category.displayOrder = index + 1;
        })

        await Promise.all(
            categories.map(category => category.save())
        )

        return res.status(200).json(categories);

    } catch (err) {
        console.error(err);

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
    reorderCategory,
    deleteCategory
}