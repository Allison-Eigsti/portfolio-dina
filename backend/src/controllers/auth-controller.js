require("dotenv").config()

const User = require("./models/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function loginUser(req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect." })
    }

    // authenticate user
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Email or password incorrect." })
    }

    // authorize and serialize w jwt (Create jwt for session)
    // send jwt back to client browser
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
  getUser,
}
