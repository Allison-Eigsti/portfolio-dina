const express = require('express')
const router = express.Router()

const { loginUser, getUser } = require('../controllers/auth-controller')
const authorization = require('../middleware/authorization.js')


router.post('/login', loginUser)
router.get('/me', authorization, getUser)


module.exports = router