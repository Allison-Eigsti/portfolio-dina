require("dotenv").config()

const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// función para iniciar sesión de usuario
async function loginUser(req, res) {
  const { email, password } = req.body

  try {
    // intentar encontrar usuario en base de datos
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect." })
    }

    // si hay un usuario con este correo, autenticar usuario
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Email or password incorrect." })
    }

    // autorizar y zerializar con JWT (Generar un JWT para la sesión)
    // enviar jwt al navegador del cliente
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    )
    console.log("user successfully logged in:", user.name)
    res.json({
      accessToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}

// función para recibir datos del usuario actual
async function getUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    res.json({ user })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}

module.exports = {
  loginUser,
  getUser
}
