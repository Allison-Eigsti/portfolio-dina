const Category = require('../models/Category')


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
            thumbnail,
            displayOrder
        } = req.body

        if (!name || !thumbnail?.url || displayOrder === undefined ) {
            return res.status(400).json({
                message: "Name, thumbnail and display order are required"
            })
        }

        const category = new Category({
            name,
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
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        }

        const newOrder = req.body.displayOrder
        const oldOrder = req.body.displayOrder

        if (newOrder !== undefined && newOrder !== oldOrder) {

            if (newOrder < oldOrder) {
                await Category.updateMany(
                    {
                        _id: { $ne: req.params.id },
                        displayOrder: {
                            $gte: newOrder,
                            $lt: oldOrder
                        }
                    },
                    {
                        $inc: { displayOrder: 1 }
                    }
                )
            }

            if (newOrder > oldOrder) {
                await Category.updateMany(
                    {
                        _id: { $ne: req.params.id },
                        displayOrder: {
                            $gt: oldOrder,
                            $lte: newOrder
                        }
                    },
                    {
                        $inc: { displayOrder: -1 }
                    }
                )
            }
        }

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

        const updatedCategory = await Category.findByIdAndUpdate(
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

        return res.status(200).json(updatedCategory)

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