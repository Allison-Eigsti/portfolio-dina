const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Función middleware para autorizar al usuario:  
async function authorization(req, res, next) {
    // extrae el token JWT de la petición
    const authHeader = req.headers['authorization']
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token required.' })
    }

    const token = authHeader.split(' ')[1] // Aislar el string del token

    // verifica su validez
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //busca al usuario correspondiente en la base de datos
        const user = await User.findById(decoded.id).select('-password')

        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            })
        }

        // adjunta sus datos a req.user
        req.user = user

        next()

    } catch(err) {
        return res.status(401).json({ message: "Invalid authorization token" })
    }
}

module.exports = authorization