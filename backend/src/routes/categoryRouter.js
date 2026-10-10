const express = require('express')
const router = express.Router()
const { getAllCategories, getCategoryById, createCategory, updateCategory, reorderCategory, deleteCategory } = require('../controllers/category-controller')
const authorization = require('../middleware/authorization')
const upload = require('../middleware/upload')
const requireAdmin = require('../middleware/requireAdmin')

// Rutas para categorías
// Rutas no protegidas
router.get('/', getAllCategories)
router.get('/:id', getCategoryById)

// Middleware que protege las siguientes rutas
router.use(authorization, requireAdmin)

// Crear una categoría nueva
router.post('/', 
    upload.fields([
        { name: "thumbnail", maxCount: 1 }
    ]),
  createCategory)

// Editar una categoría
router.put('/:id',
        upload.fields([
        { name: "thumbnail", maxCount: 1 }
    ]),
    updateCategory)

// Editar el orden de las categorías (no lo he utilizado todavía)
router.patch('/:id', reorderCategory)

// Borrar categoría
router.delete('/:id', deleteCategory)

module.exports = router
