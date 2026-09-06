const express = require('express')
const router = express.Router()
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category-controller')
const authorization = require('../middleware/authorization')


router.get('/', getAllCategories)
router.get('/:id', getCategoryById)

router.use(authorization)

router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
