const express = require('express')
const router = express.Router()
const { getAllCategories, getCategoryById, createCategory, updateCategory, reorderCategory, deleteCategory } = require('../controllers/category-controller')
const authorization = require('../middleware/authorization')
const upload = require('../middleware/upload')


router.get('/', getAllCategories)
router.get('/:id', getCategoryById)

router.post('/', 
    upload.fields([
        { name: "thumbnail", maxCount: 1 }
    ]),
  createCategory)

router.use(authorization)

router.put('/:id',
        upload.fields([
        { name: "thumbnail", maxCount: 1 }
    ]),
    updateCategory)

router.patch('/:id', reorderCategory)
router.delete('/:id', deleteCategory)

module.exports = router
