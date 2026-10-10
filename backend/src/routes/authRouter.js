const express = require('express')
const router = express.Router()

// Middleware
const { loginUser, getUser } = require('../controllers/auth-controller')
const authorization = require('../middleware/authorization.js')

// Rutas para la autorización, como solamente tengo un administrador para el sistema de gestión de contenido, no tengo una ruta de registrar
// Seed.js creyó mi usuario

//Iniciar sesión nuevo
router.post('/login', loginUser)

// Agarrar datos del usuario
router.get('/me', authorization, getUser)


module.exports = router